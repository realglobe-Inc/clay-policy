/**
 * Type restrictions for clay entity
 * @class ClayPolicy
 * @param {Object} properties - Property config
 * @param {Object} [options={}] - Optional settings
 */
'use strict'

const { PolicyError } = require('clay-errors')
const { restrictionHelper, validationHelper } = require('./helpers')
const Reasons = require('./reasons')
const { restrictionsFromProperties, propertyRestriction } = restrictionHelper
const { isMissing, isTypeOf, isEnumOf, failure } = validationHelper
const { typeOf } = require('clay-serial')

const {
  UNEXPECTED_TYPE,
  UNEXPECTED_VALUE,
  OUT_OF_RANGE
} = Reasons

/** @lends ClayPolicy */
class ClayPolicy {
  get $$policy () {
    return true
  }

  constructor (properties, options = {}) {
    const s = this
    s.restrictions = restrictionsFromProperties(properties)
    s._policyArgs = [ ...arguments ]
  }

  /**
   * Validate an entity
   * @param {ClayEntity} entity - Entity to validate
   * @returns {?PolicyError} Returns a PolicyError if something is wrong
   */
  validate (entity = {}) {
    const s = this
    const { restrictions } = s
    let missing = restrictions.required.filter((name) => isMissing(entity[ name ]))
    let propertyNames = Object.keys(entity)
    let failures = propertyNames
      .map((name) => {
        const restriction = propertyRestriction(s.restrictions, name)
        let failure = s.testRestriction(restriction, entity[ name ])
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
    const { type, enum: enum_ } = restriction
    let typeFail = type && !isTypeOf(type, value)
    if (typeFail) {
      return failure(UNEXPECTED_TYPE, { actual: typeOf(value), expects: type })
    }
    let enumFail = enum_ && !isEnumOf(enum_, value)
    if (enumFail) {
      return failure(UNEXPECTED_VALUE, { actual: value, expects: { oneOf: enum_ } })
    }
    return null
  }

  /**
   * Clone this policy
   * @returns {ClayPolicy} Cloned policy
   */
  clone () {
    const s = this
    return new ClayPolicy(...s._policyArgs)
  }
}

module.exports = ClayPolicy
