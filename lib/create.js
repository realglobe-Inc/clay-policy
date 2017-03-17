/**
 * Create a ClayPolicy instance
 * @function create
 * @param {...*} args
 * @returns {ClayPolicy}
 */
'use strict'

const ClayPolicy = require('./clay_policy')

/** @lends create */
function create (...args) {
  return new ClayPolicy(...args)
}

module.exports = create
