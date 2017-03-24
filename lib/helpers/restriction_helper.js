/**
 * Helper for restriction
 * @module restrictionHelper
 */
'use strict'

const fieldNames = ($$policy) => Object.keys($$policy || {}).filter((name) => !/^\$/.test(name))
const { PolicySchema } = require('clay-schemas')
const { LogPrefixes } = require('clay-constants')
const { POLICY_PREFIX } = LogPrefixes
const DataTypes = require('../data_types')
const tv4 = require('tv4')

const DataTypeValues = Object.keys(DataTypes).map((name) => DataTypes[ name ])

/** @lends restrictionHelper */
module.exports = Object.assign(exports, {
  /**
   * Get required field names
   * @param {Object} $$restrictions
   * @returns {string[]}
   */
  requiredFieldNames ($$restrictions) {
    return fieldNames($$restrictions).filter((name) => $$restrictions[ name ].required)
  },

  /**
   * Format fields
   * @param {Object} $$restrictions
   * @returns {*}
   */
  formatRestrictions ($$restrictions) {
    if (!$$restrictions) {
      return {}
    }
    if ($$restrictions.$$restrictions) {
      $$restrictions = $$restrictions.$$restrictions
    }
    const formatField = (field) => {
      if (!field) {
        return field
      }
      let { type } = field
      if (DataTypes.hasOwnProperty(type)) {
        field.type = DataTypes[ type ] || type
      }
      return field
    }
    return fieldNames($$restrictions).reduce((formatted, name) => Object.assign(formatted, {
      [name]: formatField($$restrictions[ name ])
    }), {})
  },

  /**
   * Validate field values
   * @param {Object} $$restrictions
   * @throws {Error}
   */
  validateRestrictions ($$restrictions) {
    const schema = Object.assign({}, PolicySchema, { id: null })
    let { error, valid } = tv4.validateResult($$restrictions, schema)
    if (!valid) {
      throw new Error(`${POLICY_PREFIX} ${error}`)
    }
    for (let name of Object.keys($$restrictions)) {
      let field = $$restrictions[ name ]
      let { type } = field
      let unknownType = type && !~DataTypeValues.indexOf(type)
      if (unknownType) {
        console.warn(`${POLICY_PREFIX} Unknown type "${type}" passed for field "${name}"`)
      }
    }
  }

})

