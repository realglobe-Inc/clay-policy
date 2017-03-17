/**
 * Type restrictions for clay entity
 * @class ClayPolicy
 * @param {Object} properties - Property config
 * @param {Object} [options={}] - Optional settings
 */
'use strict'

const { PolicyError } = require('clay-errors')
const { validationHelper } = require('./helpers')
const { isMissing, isTypeOf, isEnumOf } = validationHelper

/** @lends ClayPolicy */
class ClayPolicy {
  get $$policy () {
    return true
  }

  constructor (properties, options = {}) {
    const s = this

    let propertyNames = Object.keys(properties || {})
    s.restrictions = {
      required: [
        ...propertyNames.filter((name) => properties[ name ].required)
      ],
      types: propertyNames.reduce((types, name) => Object.assign(types, {
        [name]: properties[ name ].type
      }), {}),
      enums: propertyNames.reduce((enums, name) => Object.assign(enums, {
        [name]: properties[ name ].oneOf
      }), {})
    }
    s._args = [ ...arguments ]
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
        let value = entity[ name ]
        let type = restrictions.types[ name ]
        let enums = restrictions.enums[ name ]
        let typeFail = type && !isTypeOf(type, value)
        if (typeFail) {
          return { name, failure: { reason: 'type', expects: type, actual: value } }
        }
        let enumFail = enums && !isEnumOf(enums, value)
        console.log('enumFail', enums, value, name)
        if (enumFail) {
          return { name, failure: { reason: 'enums', expects: enums, actual: value } }
        }
        return false
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
   * Clone this policy
   * @returns {ClayPolicy} Cloned policy
   */
  clone () {
    const s = this
    return new ClayPolicy(...s._args)
  }
}

module.exports = ClayPolicy
