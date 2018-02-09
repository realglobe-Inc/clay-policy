/**
 * Helper modules
 * @module helpers
 */

'use strict'

const d = (module) => module && module.default || module

const messageHelper = d(require('./message_helper'))
const restrictionHelper = d(require('./restriction_helper'))
const validationHelper = d(require('./validation_helper'))

module.exports = {
  messageHelper,
  restrictionHelper,
  validationHelper
}


exports.messageHelper = messageHelper
exports.restrictionHelper = restrictionHelper
exports.validationHelper = validationHelper
