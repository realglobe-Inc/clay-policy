/**
 * Schema helpers for ClayDB resources
 * @module clay-policy
 */

'use strict'

const create = require('./create')
const ClayResource = require('./clay_resource')
const fromDriver = require('./from_driver')

let lib = create.bind(this)

Object.assign(lib, ClayResource, {
  create,
  ClayResource,
  fromDriver
})

module.exports = lib
