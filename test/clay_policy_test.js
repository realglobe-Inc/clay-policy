/**
 * Test case for clayPolicy.
 * Runs with mocha.
 */
'use strict'

const ClayPolicy = require('../lib/clay_policy.js')
const DataTypes = require('../lib/data_types')
const { deepEqual, equal, notEqual, ok } = require('assert')

describe('clay-policy', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Clay policy', async () => {
    const policy = new ClayPolicy({
      username: {
        type: DataTypes.STRING,
        required: true
      },
      birthday: {
        type: [DataTypes.DATE, DataTypes.NUMBER]
      },
      rank: {
        type: DataTypes.STRING,
        oneOf: ['GOLD', 'SLIVER', 'BRONZE']
      },
      index: {
        type: DataTypes.NUMBER,
        minimum: 1,
        maximum: 10,
        exclusiveMaximum: true
      }
    })
    ok(
      !policy.validate({
        username: 'hoge',
        birthday: new Date(),
        rank: 'GOLD',
        index: 2
      })
    )
    {
      const missingError = policy.validate({})
      deepEqual(missingError.detail.missing, ['username'])
    }
    {
      const missingError = policy.validate({}, { namespace: 'hoge' })
      deepEqual(missingError.detail.missing, ['hoge.username'])
    }
    {
      const missingError = policy.validate({}, { ignoreMissing: true })
      ok(!missingError)
    }
    {
      const typeError = policy.validate({
        username: 'hoge',
        birthday: 'FOO'
      })
      deepEqual(typeError.detail.failures, {
        birthday: {
          reason: 'UNEXPECTED_TYPE_ERROR',
          expects: [
            'cly:date',
            'cly:number'
          ],
          actual: 'cly:string'
        }
      })
    }
    {
      const typeError = policy.validate({
        username: 'hoge',
        birthday: 'FOO'
      }, { namespace: 'user' })
      deepEqual(typeError.detail.failures, {
        'user.birthday': {
          reason: 'UNEXPECTED_TYPE_ERROR',
          expects: [
            'cly:date',
            'cly:number'
          ],
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
      ok(enumsError.message)
      deepEqual(enumsError.detail.failures, {
        rank: {
          reason: 'UNEXPECTED_VALUE_ERROR',
          expects: { oneOf: ['GOLD', 'SLIVER', 'BRONZE'] },
          actual: 'ULTRA'
        }
      })
    }
    {
      let enumsError = policy.validate({
        username: 'hoge',
        birthday: new Date(),
        rank: null
      })
      ok(!enumsError)
    }
    {
      let rangeError = policy.validate({
        index: -1
      })
      deepEqual(rangeError.detail.failures, {
        index: {
          actual: -1,
          expects: { min: 1, max: 10 },
          reason: 'OUT_OF_RANGE_ERROR'
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
          reason: 'OUT_OF_RANGE_ERROR'
        }
      })
    }

    ok(policy.clone())
  })

  it('Policy from policy', async () => {
    const policy = new ClayPolicy({ foo: { type: DataTypes.STRING } })
    const policy02 = new ClayPolicy(policy)
    ok(policy02.validate({ foo: 123 }))
    ok(!policy02.validate({ foo: 'bar' }))
  })

  it('Digest', async () => {
    equal(
      new ClayPolicy({ foo: { type: DataTypes.STRING } }).toDigest(),
      new ClayPolicy({ foo: { type: DataTypes.STRING } }).toDigest()
    )
    notEqual(
      new ClayPolicy({ foo: { type: DataTypes.STRING } }).toDigest(),
      new ClayPolicy({ bar: { type: DataTypes.STRING } }).toDigest()
    )
  })

  it('Invalid type', async () => {
    let policy = new ClayPolicy({
      foo: { type: DataTypes.STRING },
      bar: { type: 'STRING' },
      baz: { type: 'HOGE' }
    })
    ok(policy)
  })

  it('Unknown attributes', async () => {
    let policy = new ClayPolicy({
      foo: { type: 'STRING' }
    })
    ok(!policy.validate({ 'bar': 1 }))
  })

  it('Pattern match', async () => {
    let policy = new ClayPolicy({
      foo: { type: 'STRING', pattern: /^[a-z]+\/[1-9]+$/ }
    })
    ok(!policy.validate({ 'foo': 'abc/123' }))
    let error = policy.validate({ 'foo': 'zzz' }, { prefix: 'HOGEHOGE' })
    ok(error.message.match('HOGEHOGE'))
    ok(error)
  })

  it('Unique filters', async () => {
    let policy = new ClayPolicy({
      foo: { type: 'STRING', unique: true },
      group: { type: 'STRING' },
      kind: { type: 'BOOLEAN' },
      index: { type: 'STRING', uniqueFor: ['group', 'kind'] }
    })
    deepEqual(
      policy.uniqueFilters({ foo: 'bar', 'baz': 'quz' }),
      [{ foo: 'bar' }]
    )

    deepEqual(
      policy.uniqueFilters({ group: 'A', kind: 'x', index: 1 }),
      [{ index: 1, group: 'A', kind: 'x' }]
    )
  })

  it('Forbid multiple', async () => {
    {
      let policy = new ClayPolicy({
        foo: { type: 'STRING', multiple: false }
      })
      ok(policy.validate({ foo: ['foo'] }))
    }
    {
      let policy = new ClayPolicy({
        foo: { type: 'STRING', multiple: true }
      })
      ok(!policy.validate({ foo: ['foo'] }))

      deepEqual(
        policy.validate({ foo: ['foo', 2] }).detail.failures.foo,
        {
          actual: 'cly:number',
          expects: 'cly:string',
          index: 1,
          reason: 'UNEXPECTED_TYPE_ERROR'
        }
      )
    }
  })

  it('Default values', async () => {
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
  })
})

/* global describe, before, after, it */
