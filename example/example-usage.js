'use strict'

const clayPolicy = require('clay-policy')
const {STRING, DATE} = clayPolicy.DataTypes

async function tryPolicy () {
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
      oneOf: ['GOLD', 'SLIVER', 'BRONZE']
    }
  })

  const error = policy.validate({
    username: 'hoge',
    rank: 'SUPER'
  })
  console.error(error.detail.failures) // -> { rank: { reason: 'enums', expects: [ /* ... */ ], actual: 'ULTRA' } }
}

tryPolicy().catch((err) => console.error(err))
