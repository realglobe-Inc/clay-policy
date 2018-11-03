/**
 * Helper modules
 * @module helpers
 */

'use strict'

const _d = (module) => module && module.default || module

const messageHelper = _d(require('./message_helper'))
const restrictionHelper = _d(require('./restriction_helper'))
const validationHelper = _d(require('./validation_helper'))

module.exports = {
  messageHelper,
  restrictionHelper,
  validationHelper
}
