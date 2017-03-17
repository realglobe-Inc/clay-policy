/**
 * Test case for isPolicy.
 * Runs with mocha.
 */
'use strict'

const isPolicy = require('../lib/is_policy.js')
const ClayPolicy = require('../lib/clay_policy')
const { ok } = require('assert')
const co = require('co')

describe('is-policy', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Is policy', () => co(function * () {
    ok(isPolicy(new ClayPolicy()))
    ok(isPolicy({ $$policy: true }))
  }))
})

/* global describe, before, after, it */
