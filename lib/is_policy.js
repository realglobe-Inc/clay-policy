/**
 *
 * @function isPolicy
 * @param {*} obj
 * @returns {boolean}
 */
'use strict'

const ClayPolicy = require('./clay_policy')

/** @lends isPolicy */
function isPolicy (obj) {
  if (!obj) {
    return false
  }
  return (obj instanceof ClayPolicy) || obj.$$policy
}

module.exports = isPolicy
