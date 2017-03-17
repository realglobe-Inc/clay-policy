/**
 * Test case for clayPolicy.
 * Runs with mocha.
 */
'use strict'

const ClayPolicy = require('../lib/clay_policy.js')
const Types = require('../lib/types')
const { deepEqual } = require('assert')
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
      deepEqual(typeError.detail.failures, { birthday: { reason: 'type', expects: 'clay:date', actual: 'FOO' } })
    }
    {
      let enumsError = policy.validate({
        username: 'hoge',
        birthday: new Date(),
        rank: 'ULTRA'
      })
      console.log(enumsError)
      deepEqual(enumsError.detail.failures, {
        rank: {
          reason: 'enums',
          expects: [ 'GOLD', 'SLIVER', 'BRONZE' ],
          actual: 'ULTRA'
        }
      })
    }
  }))
})

/* global describe, before, after, it */
