/**
 * Test case for restrictionHelper.
 * Runs with mocha.
 */
'use strict'

const { validateRestrictions, formatRestrictions } = require('../lib/helpers/restriction_helper.js')
const { deepEqual } = require('assert')


describe('restriction-helper', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Validate', async () => {
    validateRestrictions({
      foo: {
        type: 'HOGE'
      }
    })
  })

  it('Format', async () => {
    let formatted = formatRestrictions({
      foo: {
        type: 'STRING'
      }
    })
    deepEqual(formatted, { foo: { type: 'cly:string' } })
  })
})

/* global describe, before, after, it */
