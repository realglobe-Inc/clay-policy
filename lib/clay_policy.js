/**
 * Type restrictions for clay entity
 * @class ClayPolicy
 * @param {Object} properties - Property config
 */
'use strict'

const { PolicyError } = require('clay-errors')
const { restrictionHelper, validationHelper } = require('./helpers')
const { cleanup } = require('asobj')
const Reasons = require('./reasons')
const { digestJson } = require('adigest')
const { requiredFieldNames, formatRestrictions, validateRestrictions } = restrictionHelper
const {
  isMissing,
  isTypeOf,
  isEnumOf,
  inRange,
  failure
} = validationHelper
const { typeOf } = require('clay-serial')

const {
  UNEXPECTED_TYPE,
  UNEXPECTED_VALUE,
  OUT_OF_RANGE,
  LENGTH_OUT_OF_RANGE
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
   * @returns {?PolicyError} Returns a PolicyError if something is wrong
   */
  validate (entity) {
    const s = this
    const { $$restrictions } = s
    let missing = requiredFieldNames($$restrictions).filter((name) => isMissing(entity[ name ]))
    let names = Object.keys(entity)
    let knownNames = names.filter((name) => s.hasRestrictionFor(name))
    let failures = knownNames.map((name) => {
      let failure = s.testRestriction($$restrictions[ name ], entity[ name ])
      return failure ? { name, failure } : null
    })
      .filter(Boolean)
      .reduce((failures, { name, failure }) => Object.assign(failures, {
        [name]: failure
      }), {})
    let isValid = (missing.length === 0) && (Object.keys(failures).length === 0)
    if (isValid) {
      return null
    }
    let error = new PolicyError(`Validation failed`, {
      missing,
      failures
    })
    delete error.stack
    return error
  }

  /**
   * Validate an entity and throw error if failed.
   * @param {ClayEntity} entity - Entity to validate
   * @throws {PolicyError}
   */
  validateToThrow (entity) {
    const s = this
    let error = s.validate(entity)
    if (error) {
      throw error
    }
  }

  /**
   * Validate a property value
   * @param {PropertyRestriction} restriction - Property restriction
   * @param {*} value - Property value
   * @returns {?Object} Restriction failure
   */
  testRestriction (restriction, value) {
    const {
      type,
      oneOf,
      minimum,
      maximum,
      minLength,
      maxLength,
      exclusiveMaximum = false,
      exclusiveMinimum = false
    } = restriction
    let typeFail = type && !isTypeOf(type, value)
    if (typeFail) {
      return failure(UNEXPECTED_TYPE, { actual: typeOf(value), expects: type })
    }
    let enumFail = oneOf && !isEnumOf(oneOf, value)
    if (enumFail) {
      return failure(UNEXPECTED_VALUE, { actual: value, expects: { oneOf } })
    }
    let valueAsNumber = Number(value)
    if (!isNaN(valueAsNumber)) {
      let rangeFail = !inRange([ minimum, maximum ], valueAsNumber, { exclusive: [ exclusiveMinimum, exclusiveMaximum ] })
      if (rangeFail) {
        return failure(OUT_OF_RANGE, { actual: valueAsNumber, expects: cleanup({ min: minimum, max: maximum }) })
      }
    }
    if (value.hasOwnProperty('length')) {
      let lengthFail = !inRange([ minLength, maxLength ], value.length)
      if (lengthFail) {
        return failure(LENGTH_OUT_OF_RANGE, { actual: value, expects: cleanup({ min: minLength, max: maxLength }) })
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
    const { $$restrictions } = s
    return !!$$restrictions[ name ]
  }

  /**
   * Clone this policy
   * @returns {ClayPolicy} Cloned policy
   */
  clone () {
    const s = this
    const { $$restrictions } = s
    return new ClayPolicy($$restrictions)
  }

  /**
   * Convert into JSON compatible values
   * @returns {Object} Values
   */
  toValues () {
    const s = this
    const { $$restrictions } = s
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
