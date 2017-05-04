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
   * Pattern matches
   * @param {string|RegExp} pattern
   * @param {*} value
   * @returns {boolean}
   */
  isPatternOf (pattern, value) {
    return new RegExp(String(pattern)).test(value)
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
   * @param {Object} options
   * @returns {boolean}
   */
  inRange (range, value, options = {}) {
    let [ minimum = -Infinity, maximum = Infinity ] = range
    let {
      exclusive = [ false, false ]
    } = options
    let minOK = exclusive[ 0 ] ? (minimum < value) : (minimum <= value)
    let maxOK = exclusive[ 1 ] ? (value < maximum) : (value <= maximum)
    return minOK && maxOK
  },

  /**
   * Create failure object
   * @param {string} reason
   * @param {...Object} info
   * @returns {Object}
   */
  failure (reason, ...info) {
    return Object.assign({}, ...info, {
      reason
    })
  }
})

