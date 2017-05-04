/**
 * Test case for clayPolicy.
 * Runs with mocha.
 */
'use strict'

const ClayPolicy = require('../lib/clay_policy.js')
const DataTypes = require('../lib/data_types')
const { deepEqual, equal, notEqual, ok } = require('assert')
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
        type: DataTypes.STRING,
        required: true
      },
      birthday: {
        type: DataTypes.DATE
      },
      rank: {
        type: DataTypes.STRING,
        oneOf: [ 'GOLD', 'SLIVER', 'BRONZE' ]
      },
      index: {
        type: DataTypes.NUMBER,
        minimum: 1,
        maximum: 10,
        exclusiveMaximum: true
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
          expects: 'cly:date',
          actual: 'cly:string'
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

    {
      let rangeError = policy.validate({
        index: 10
      })
      deepEqual(rangeError.detail.failures, {
        index: {
          actual: 10,
          expects: { min: 1, max: 10 },
          reason: 'range:out'
        }
      })
    }

    ok(policy.clone())
  }))

  it('Policy from policy', () => co(function * () {
    let policy = new ClayPolicy({ foo: { type: DataTypes.STRING } })
    let policy02 = new ClayPolicy(policy)
    ok(policy02.validate({ foo: null }))
    ok(!policy02.validate({ foo: 'bar' }))
  }))

  it('Digest', () => co(function * () {
    equal(
      new ClayPolicy({ foo: { type: DataTypes.STRING } }).toDigest(),
      new ClayPolicy({ foo: { type: DataTypes.STRING } }).toDigest()
    )
    notEqual(
      new ClayPolicy({ foo: { type: DataTypes.STRING } }).toDigest(),
      new ClayPolicy({ bar: { type: DataTypes.STRING } }).toDigest()
    )
  }))

  it('Invalid type', () => co(function * () {
    let policy = new ClayPolicy({
      foo: { type: DataTypes.STRING },
      bar: { type: 'STRING' },
      baz: { type: 'HOGE' }
    })
    ok(policy)
  }))

  it('Unknown attributes', () => co(function * () {
    let policy = new ClayPolicy({
      foo: { type: 'STRING' }
    })
    ok(!policy.validate({ 'bar': 1 }))
  }))

  it('Pattern match', () => co(function * () {
    let policy = new ClayPolicy({
      foo: { type: 'STRING', pattern: /^[a-z]+\/[1-9]+$/ }
    })
    ok(!policy.validate({ 'foo': 'abc/123' }))
    ok(policy.validate({ 'foo': 'zzz' }))
  }))

  it('Unique filters', () => co(function * () {
    let policy = new ClayPolicy({
      foo: { type: 'STRING', unique: true }
    })
    let filters = policy.uniqueFilters({ foo: 'bar', 'baz': 'quz' })
    deepEqual(filters, [ { foo: 'bar' } ])
  }))

  it('Forbid multiple', () => co(function * () {
    {
      let policy = new ClayPolicy({
        foo: { type: 'STRING', multiple: false }
      })
      ok(policy.validate({ foo: [ 'foo' ] }))
    }
    {
      let policy = new ClayPolicy({
        foo: { type: 'STRING', multiple: true }
      })
      ok(!policy.validate({ foo: [ 'foo' ] }))

      deepEqual(
        policy.validate({ foo: [ 'foo', 2 ] }).detail.failures.foo,
        {
          actual: 'cly:number',
          expects: 'cly:string',
          index: 1,
          reason: 'type:unexpected'
        }
      )
    }
  }))

  it('Default values', () => co(function * () {
    let policy = new ClayPolicy({
      hoge: {
        type: 'STRING',
        default: () => 'a'
      },
      bar: {
        type: 'STRING',
        default: 'b'
      }
    })
    let entity = { 'bar': 'jj' }
    ok(!policy.validate(entity))

    let defaultsFor = policy.defaultsFor(entity)
    deepEqual(defaultsFor, { hoge: 'a' }, 'Fill defaults')
  }))
})

/* global describe, before, after, it */
