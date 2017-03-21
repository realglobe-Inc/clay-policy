/**
 * Test case for clayPolicy.
 * Runs with mocha.
 */
'use strict'

const ClayPolicy = require('../lib/clay_policy.js')
const Types = require('../lib/types')
const { deepEqual, ok } = require('assert')
const co = require('co')

describe('clay-policy', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Clay policy', () => co(function * () {
    let policy = new ClayPolicy({
      username: {
        type: Types.STRING,
        required: true
      },
      birthday: {
        type: Types.DATE
      },
      rank: {
        type: Types.STRING,
        oneOf: [ 'GOLD', 'SLIVER', 'BRONZE' ]
      },
      index: {
        type: Types.NUMBER,
        minimum: 1,
        maximum: 10
      }
    })
    {
      let missingError = policy.validate({})
      deepEqual(missingError.detail.missing, [ 'username' ])
    }
    {
      let typeError = policy.validate({
        username: 'hoge',
        birthday: 'FOO'
      })
      deepEqual(typeError.detail.failures, {
        birthday: {
          reason: 'type:unexpected',
          expects: 'clay:date',
          actual: 'clay:string'
        }
      })
    }
    {
      let enumsError = policy.validate({
        username: 'hoge',
        birthday: new Date(),
        rank: 'ULTRA'
      })
      deepEqual(enumsError.detail.failures, {
        rank: {
          reason: 'value:unexpected',
          expects: { oneOf: [ 'GOLD', 'SLIVER', 'BRONZE' ] },
          actual: 'ULTRA'
        }
      })
    }
    {
      let rangeError = policy.validate({
        index: -1
      })
      deepEqual(rangeError.detail.failures, {
        index: {
          actual: -1,
          expects: { min: 1, max: 10 },
          reason: 'range:out'
        }
      })
    }

    ok(policy.clone())
  }))

  it('Policy from policy', () => co(function * () {
    let policy = new ClayPolicy({ foo: { type: Types.STRING } })
    let policy02 = new ClayPolicy(policy)
    ok(policy02.validate({ foo: null }))
    ok(!policy02.validate({ foo: 'bar' }))
  }))
})

/* global describe, before, after, it */
