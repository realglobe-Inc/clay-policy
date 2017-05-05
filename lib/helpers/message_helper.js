/**
 * Helper for message
 * @module messageHelper
 */
'use strict'

const { EOL } = require('os')

/** @lends messageHelper */
module.exports = Object.assign(exports, {
  missingMessage (missing) {
    let hasMissing = missing && missing.length > 0
    if (!hasMissing) {
      return null
    }
    return `Required field missing: ${JSON.stringify(missing)}`
  },
  failuresMessage (failures) {
    let names = failures && Object.keys(failures)
    let hasFailures = names.length > 0
    if (!hasFailures) {
      return null
    }
    return [
      'Field errors occurred:',
      '',
      ...names.map((name) => {
        let { reason } = failures[ name ]
        return `  ${name}:\t${JSON.stringify(failures[ name ])}`
      }),
      ''
    ].join(EOL)
  },
  messageFor ({ prefix, missing, failures }) {
    const { missingMessage, failuresMessage } = exports
    let message = missingMessage(missing) || failuresMessage(failures)
    if (prefix) {
      message = `[${prefix}] ${message}`
    }
    return message
  }
})
