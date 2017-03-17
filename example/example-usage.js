'use strict'

const clayLump = require('clay-lump')
const clayPolicy = require('clay-policy')
const { STRING, DATE } = clayPolicy.Types

async function tryPolicy () {
  const lump = clayLump('testing-wrapn')
  const User = lump.reource('User')

  const policy = clayPolicy({
    username: {
      type: STRING,
      required: true
    },
    birthday: {
      type: DATE
    },
    rank: {
      type: STRING,
      oneOf: [ 'GOLD', 'SLIVER', 'BRONZE' ]
    }
  })

  let error = policy.validate({
    username: 'hoge',
    rank: [ 'SUPER' ]
  })
  console.errors(error.detail.failures) // -> { rank: { reason: 'enums', expects: [ /* ... */ ], actual: 'ULTRA' } }
}

tryPolicy().catch((err) => console.error(err))
