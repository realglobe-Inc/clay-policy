/**
 * Helper for restriction
 * @module restrictionHelper
 */
'use strict'

const fieldNames = ($$policy) => Object.keys($$policy || {}).filter((name) => !/^\$/.test(name))

/** @lends restrictionHelper */
module.exports = Object.assign(exports, {

  requiredFields ($$fields) {
    return fieldNames($$fields).filter((name) => $$fields[ name ].required)
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
