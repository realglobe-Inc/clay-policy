/**
 * Helper modules
 * @module helpers
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get validationHelper () { return d(require('./validation_helper')) }
}
