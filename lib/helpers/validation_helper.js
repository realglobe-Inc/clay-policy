/**
 * Helper module for validation
 * @module validationHelper
 */
'use strict'

const { typeOf } = require('clay-serial')

module.exports = Object.assign(exports, {
  /**
   * Is missing or not
   * @param {*} value
   * @returns {boolean}
   */
  isMissing (value) {
    if (Array.isArray(value)) {
      return value.length === 0
    }
    return (typeof value === 'undefined') || (value === null)
  },

  /**
   * Type matches
   * @param {string} type
   * @param {*} value
   * @returns {boolean}
   */
  isTypeOf (type, value) {
    return type === typeOf(value)
  },

  /**
   * Matches enum
   * @param {string[]} enums
   * @param {*} value
   * @returns {boolean}
   */
  isEnumOf (enums, value) {
    return !!~enums.indexOf(value)
  },

  /**
   * Inside range
   * @param {number[]} range
   * @param {*} value
   * @returns {boolean}
   */
  inRange (range, value) {
    let [ minimum = -Infinity, maximum = Infinity ] = range
    return (minimum <= value) && (value <= maximum)
  },

  /**
   * Create failure object
   * @param {string} reason
   * @param {Object} detail
   * @returns {Object}
   */
  failure (reason, detail) {
    return Object.assign({}, detail, {
      reason
    })
  }
})


