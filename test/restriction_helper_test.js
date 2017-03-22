/**
 * Test case for restrictionHelper.
 * Runs with mocha.
 */
'use strict'

const { validateFields, formatFields } = require('../lib/helpers/restriction_helper.js')
const { deepEqual } = require('assert')
const co = require('co')

describe('restriction-helper', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Validate', () => co(function * () {
    validateFields({
      foo: {
        type: 'STRING'
      }
    })
  }))

  it('Format', () => co(function * () {
    let formatted = formatFields({
      foo: {
        type: 'STRING'
      }
    })
    deepEqual(formatted, { foo: { type: 'clay:string' } })
  }))
})

/* global describe, before, after, it */
