/**
 * Test case for restrictionHelper.
 * Runs with mocha.
 */
'use strict'

const { validateRestrictions, formatRestrictions } = require('../lib/helpers/restriction_helper.js')
const { deepEqual } = require('assert')
const co = require('co')

describe('restriction-helper', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Validate', () => co(function * () {
    validateRestrictions({
      foo: {
        type: 'STRING'
      }
    })
  }))

  it('Format', () => co(function * () {
    let formatted = formatRestrictions({
      foo: {
        type: 'STRING'
      }
    })
    deepEqual(formatted, { foo: { type: 'cly:string' } })
  }))
})

/* global describe, before, after, it */
