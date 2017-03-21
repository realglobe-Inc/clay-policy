/**
 * Test case for restrictionHelper.
 * Runs with mocha.
 */
'use strict'

const { validateRestrictions } = require('../lib/helpers/restriction_helper.js')
const assert = require('assert')
const co = require('co')

describe('restriction-helper', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Restriction helper', () => co(function * () {
    validateRestrictions({
      foo: {
        type: 'STRING'
      }
    })
  }))
})

/* global describe, before, after, it */
