/**
 * Helper modules
 * @module helpers
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get messageHelper () { return d(require('./message_helper')) },
  get restrictionHelper () { return d(require('./restriction_helper')) },
  get validationHelper () { return d(require('./validation_helper')) }
}
