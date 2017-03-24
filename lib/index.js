/**
 * Schema helpers for ClayDB resources
 * @module clay-policy
 */

'use strict'

const create = require('./create')
const ClayPolicy = require('./clay_policy')
const DataTypes = require('./data_types')
const Reasons = require('./reasons')
const isPolicy = require('./is_policy')

let lib = create.bind(this)

Object.assign(lib, ClayPolicy, {
  create,
  ClayPolicy,
  isPolicy,
  DataTypes
})

module.exports = lib
