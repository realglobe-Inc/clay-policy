/**
 * Helper for restriction
 * @module restrictionHelper
 */
'use strict'

const fieldNames = ($$policy) => Object.keys($$policy || {}).filter((name) => !/^\$/.test(name))
const { PolicySchema } = require('clay-schemas')
const Types = require('../types')
const tv4 = require('tv4')

const TypeValues = Object.keys(Types).map((name) => Types[ name ])

/** @lends restrictionHelper */
module.exports = Object.assign(exports, {
  /**
   * Get required field names
   * @param {Object} $$fields
   * @returns {string[]}
   */
  requiredFieldNames ($$fields) {
    return fieldNames($$fields).filter((name) => $$fields[ name ].required)
  },

  /**
   * Format fields
   * @param {Object} $$fields
   * @returns {*}
   */
  formatFields ($$fields) {
    if (!$$fields) {
      return {}
    }
    if ($$fields.$$fields) {
      $$fields = $$fields.$$fields
    }
    const formatField = (field) => {
      if (!field) {
        return field
      }
      let { type } = field
      if (Types.hasOwnProperty(type)) {
        field.type = Types[ type ]
      }
      return field
    }
    return fieldNames($$fields).reduce((formatted, name) => Object.assign(formatted, {
      [name]: formatField($$fields[ name ])
    }), {})
  },

  /**
   * Validate field values
   * @param {Object} $$fields
   * @throws {Error}
   */
  validateFields ($$fields) {
    const schema = Object.assign({}, PolicySchema, { id: null })
    let { error, valid } = tv4.validateResult($$fields, schema)
    if (!valid) {
      throw new Error(`[INVALID_POLICY] ${error}`)
    }
    for (let name of Object.keys($$fields)) {
      let field = $$fields[ name ]
      let { type } = field
      let unknownType = type && !~TypeValues.indexOf(type)
      if (unknownType) {
        console.warn(`[Clay-Policy] Unknown type "${type}" passed for field "${name}"`)
      }
    }
  }

})

