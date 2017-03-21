/**
 * Helper for restriction
 * @module restrictionHelper
 */
'use strict'

/** @lends restrictionHelper */
module.exports = Object.assign(exports, {
  /**
   * Create restrictions from policy properties
   * @param {Object} properties
   * @returns {Restrictions}
   */
  restrictionsFromProperties (properties) {
    const propertyNames = Object.keys(properties || {})
    const extractProperty = (key) => propertyNames.reduce((types, name) =>
      Object.assign(types, {
        [name]: properties[ name ][ key ]
      }), {})
    return {
      required: [
        ...propertyNames.filter((name) => properties[ name ].required)
      ],
      types: extractProperty('type'),
      enums: extractProperty('oneOf')
    }
  },

  /**
   * Restriction for properties
   * @param {Restrictions} restrictions - Policy restrictions
   * @param {string} propertyName - Name of property
   * @returns {PropertyRestriction}
   */
  propertyRestriction (restrictions, propertyName) {
    return {
      type: restrictions.types[ propertyName ],
      enum: restrictions.enums[ propertyName ]
    }
  }
})

/**
 * @typedef {Object} Restrictions
 * @property {string[]} required
 * @property {Object} types
 * @property {Object} enums
 */

/**
 * @typedef {Object} PropertyRestriction
 * @property {string} type - Type for property
 * @property {string[]} enum - Enum values for property
 */
