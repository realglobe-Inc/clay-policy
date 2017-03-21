/**
 * Helper for restriction
 * @module restrictionHelper
 */
'use strict'

const fieldNames = ($$policy) => Object.keys($$policy || {}).filter((name) => !/^\$/.test(name))
const { PolicySchema } = require('clay-schemas')
const tv4 = require('tv4')

/** @lends restrictionHelper */
module.exports = Object.assign(exports, {
  requiredFields ($$fields) {
    return fieldNames($$fields).filter((name) => $$fields[ name ].required)
  },

  validateRestrictions ($$fields) {
    const schema = Object.assign({}, PolicySchema, { id: null })
    let { error, valid } = tv4.validateResult($$fields, schema)
    if (!valid) {
      throw new Error(`[INVALID_POLICY] ${error}`)
    }
  }

})

