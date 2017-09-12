/**
 * Type restrictions for clay entity
 * @class ClayPolicy
 * @param {Object} properties - Property config
 */
'use strict'

const {PolicyError} = require('clay-errors')
const {restrictionHelper, validationHelper, messageHelper} = require('./helpers')
const {cleanup} = require('asobj')
const Reasons = require('./reasons')
const {digestJson} = require('adigest')
const {
  requiredFieldNames,
  uniqueRules,
  trimFieldNames,
  multipleFieldNames,
  defaultValues,
  formatRestrictions,
  validateRestrictions
} = restrictionHelper
const {
  isMissing,
  isTypeOf,
  isEnumOf,
  inRange,
  isPatternOf,
  failure
} = validationHelper
const {
  messageFor
} = messageHelper
const {typeOf} = require('clay-serial')

const isEmpty = (value) => typeof value === 'undefined' || value === null

const {
  UNEXPECTED_TYPE,
  UNEXPECTED_VALUE,
  OUT_OF_RANGE,
  LENGTH_OUT_OF_RANGE,
  MULTIPLE_NOT_ALLOWED,
  PATTERN_NOT_MATCHED,
  VALIDATION_FAILED
} = Reasons

/** @lends ClayPolicy */
class ClayPolicy {
  get $$policy () {
    return true
  }

  constructor (properties = {}) {
    const s = this
    s.$$restrictions = formatRestrictions(properties)
    validateRestrictions(s.$$restrictions)
  }

  /**
   * Validate an entity
   * @param {ClayEntity} entity - Entity to validate
   * @param {Object} [options={}] - Optional settings
   * @param {string} [options.prefix] - Error message prefix
   * @param {string} [options.namespace] - Namespace for each fields
   * @param {boolean} [options.ignoreMissing] - Ignore missing
   * @returns {?PolicyError} Returns a PolicyError if something is wrong
   */
  validate (entity, options = {}) {
    const s = this
    const {prefix = null, ignoreMissing = false, namespace} = options
    const {$$restrictions} = s
    const namespaced = (name) => namespace ? [namespace, name].join('.') : name
    const missing = requiredFieldNames($$restrictions)
      .filter((name) => isMissing(entity[name]))
      .map((name) => namespaced(name))
    const names = Object.keys(entity)
    const knownNames = names.filter((name) => s.hasRestrictionFor(name))
    const failures = knownNames.map((name) => {
      const failure = s.testRestriction($$restrictions[name], entity[name])
      return failure ? {name: namespaced(name), failure} : null
    })
      .filter(Boolean)
      .reduce((failures, {name, failure}) => Object.assign(failures, {
        [name]: failure
      }), {})
    const isValid = (ignoreMissing || (missing.length === 0)) && (Object.keys(failures).length === 0)
    if (isValid) {
      return null
    }
    const message = messageFor({prefix, missing, failures})
    const error = new PolicyError(message, {
      missing,
      failures,
      reason: VALIDATION_FAILED
    })
    delete error.stack
    return error
  }

  /**
   * Format entity values. Note this method is DESTRUCTIVE.
   * @param {ClayEntity} entity - Entity to format
   * @returns {ClayEntity} Formatted entity. Same instance with the passed one
   */
  format (entity) {
    const s = this
    const {$$restrictions} = s
    for (let name of trimFieldNames($$restrictions)) {
      let value = entity[name]
      if (typeof value === 'undefined') {
        delete entity[name]
        continue
      }
      let canTrim = value && value.trim && typeof value.trim === 'function'
      if (canTrim) {
        entity[name] = value.trim()
      }
    }
    for (let name of multipleFieldNames($$restrictions)) {
      let value = entity[name]
      let shouldBeArray = !Array.isArray(value) && !isEmpty(value)
      if (shouldBeArray) {
        entity[name] = [].concat(entity[name])
      }
    }
    return entity
  }

  /**
   * Validate an entity and throw error if failed.
   * @param {ClayEntity} entity - Entity to validate
   * @param {Object} [options={}] - Optional settings
   * @throws {PolicyError}
   */
  validateToThrow (entity, options = {}) {
    const s = this
    const error = s.validate(entity, options)
    if (error) {
      throw error
    }
  }

  /**
   * Define unique filter objects for entity
   * @param {ClayEntity} entity - Entity to work with
   * @returns {Object[]} Value filter objects
   */
  uniqueFilters (entity) {
    const s = this
    const {$$restrictions} = s
    return uniqueRules($$restrictions)
      .filter(({trigger}) => !isEmpty(entity[trigger]))
      .map(({targets}) => targets.reduce((filters, target) => Object.assign(filters, {
        [target]: entity[target]
      }), {}))
  }

  /**
   * Get defaults values for an entity. This method does NOT update the passed entity
   * @param {ClayEntity} entity
   * @returns {Object} Default values
   */
  defaultsFor (entity) {
    const s = this
    const {$$restrictions} = s
    let assignable = defaultValues($$restrictions)
    let asValue = (value) => typeof value === 'function' ? value() : value
    return Object.keys(assignable)
      .filter((name) => typeof entity[name] === 'undefined')
      .reduce((assigning, name) => Object.assign(assigning, {
        [name]: asValue(assignable[name])
      }), {})
  }

  /**
   * Validate a property value
   * @param {PropertyRestriction} restriction - Property restriction
   * @param {*} value - Property value
   * @param {Object} [options={}] - Optional settings
   * @returns {?Object} Restriction failure
   */
  testRestriction (restriction, value, options = {}) {
    const s = this
    const {
      type,
      oneOf,
      minimum,
      maximum,
      minLength,
      maxLength,
      exclusiveMaximum = false,
      exclusiveMinimum = false,
      multiple = false,
      pattern
    } = restriction
    let {additionalInfo = {}, asItem = false} = options

    if (multiple && !asItem) {
      return [].concat(value).map((value, index) =>
        s.testRestriction(restriction, value, {
          additionalInfo: {index},
          asItem: true
        })).filter(Boolean).shift()
    }
    let multipleFail = !multiple && Array.isArray(value)
    if (multipleFail) {
      return failure(MULTIPLE_NOT_ALLOWED, {actual: {multiple: true}, expects: {multiple}}, additionalInfo)
    }

    let typeFail = type && !([].concat(type).some((type) => isTypeOf(type, value)))
    if (typeFail) {
      return failure(UNEXPECTED_TYPE, {actual: typeOf(value), expects: type}, additionalInfo)
    }
    let enumFail = oneOf && !isEnumOf(oneOf, value)
    if (enumFail) {
      return failure(UNEXPECTED_VALUE, {actual: value, expects: {oneOf}}, additionalInfo)
    }

    let patternFail = pattern && !isPatternOf(pattern, value)
    if (patternFail) {
      return failure(PATTERN_NOT_MATCHED, {actual: value, expects: pattern}, additionalInfo)
    }
    let valueAsNumber = Number(value)
    if (!isNaN(valueAsNumber)) {
      let rangeFail = !inRange([minimum, maximum], valueAsNumber, {exclusive: [exclusiveMinimum, exclusiveMaximum]})
      if (rangeFail) {
        return failure(OUT_OF_RANGE, {
          actual: valueAsNumber,
          expects: cleanup({min: minimum, max: maximum})
        }, additionalInfo)
      }
    }
    if (value !== null && value !== undefined && value.hasOwnProperty('length')) {
      let lengthFail = !inRange([minLength, maxLength], value.length)
      if (lengthFail) {
        return failure(LENGTH_OUT_OF_RANGE, {
          actual: value,
          expects: cleanup({min: minLength, max: maxLength})
        }, additionalInfo)
      }
    }
    return null
  }

  /**
   * Check if has restriction for a field
   * @param {string} name - Field name
   * @returns {boolean}
   */
  hasRestrictionFor (name) {
    const s = this
    const {$$restrictions} = s
    return !!$$restrictions[name]
  }

  /**
   * Clone this policy
   * @returns {ClayPolicy} Cloned policy
   */
  clone () {
    const s = this
    const {$$restrictions} = s
    return new ClayPolicy($$restrictions)
  }

  /**
   * Convert into JSON compatible values
   * @returns {Object} Values
   */
  toValues () {
    const s = this
    const {$$restrictions} = s
    return Object.assign({}, $$restrictions)
  }

  /**
   * To digest string
   * @returns {string} Digest String
   */
  toDigest () {
    const s = this
    return digestJson(s.toValues())
  }
}

module.exports = ClayPolicy
