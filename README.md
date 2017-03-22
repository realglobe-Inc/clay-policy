clay-policy
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_com_shield_url]][bd_travis_com_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/clay-policy
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/clay-policy
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/clay-policy.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/clay-policy
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/clay-policy.svg?token=aeFzCpBZebyaRijpCFmm
[bd_license_url]: https://github.com/realglobe-Inc/clay-policy/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/clay-policy
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/clay-policy.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/clay-policy.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/clay-policy
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/clay-policy.svg
[bd_npm_url]: http://www.npmjs.org/package/clay-policy
[bd_npm_shield_url]: http://img.shields.io/npm/v/clay-policy.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Schema helpers for ClayDB resources

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/00.TOC.md.hbs" Start -->

<a name="section-doc-guides-00-t-o-c-md"></a>

Table of Contents
----------------

- [Installation](#installation)
- [Usage](#usage)
- [Field Restrictions](#field-restrictions)
- [API Guide](#api-guide)
- [License](#license)
- [Links](#links)


<!-- Section from "doc/guides/00.TOC.md.hbs" End -->

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install clay-policy --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const clayPolicy = require('clay-policy')
const { STRING, DATE } = clayPolicy.Types

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
      oneOf: [ 'GOLD', 'SLIVER', 'BRONZE' ]
    }
  })

  let error = policy.validate({
    username: 'hoge',
    rank: 'SUPER'
  })
  console.error(error.detail.failures) // -> { rank: { reason: 'enums', expects: [ /* ... */ ], actual: 'ULTRA' } }
}

tryPolicy().catch((err) => console.error(err))

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/10.Field Restrictions.md.hbs" Start -->

<a name="section-doc-guides-10-field-restrictions-md"></a>

Field Restrictions
-----

| Restriction | Type | Description | default |
| ---------- | ---- | --------- | ------ |
| **type** | string | Type of the field |  |
| **oneOf** | array | Enum values for the field |  |
| **required** | boolean | Value is required for the field |  |
| **default** | any | Default value of the field |  |
| **unique** | boolean | Add unique constraint on the field |  |
| **minimum** | number | Minimum value of the field |  |
| **maximum** | number | Maximum value of the field |  |
| **minLength** | integer | Minimum length of the field |  |
| **maxLength** | integer | Maximum length of the field |  |


<!-- Section from "doc/guides/10.Field Restrictions.md.hbs" End -->

<!-- Section from "doc/guides/11.API Guide.md.hbs" Start -->

<a name="section-doc-guides-11-a-p-i-guide-md"></a>

API Guide
-----

+ [clay-policy@1.3.0](./doc/api/api.md)
  + [create(args)](./doc/api/api.md#clay-policy-function-create)
  + [isPolicy(obj)](./doc/api/api.md#clay-policy-function-is-policy)
  + [ClayPolicy](./doc/api/api.md#clay-policy-class)


<!-- Section from "doc/guides/11.API Guide.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/realglobe-Inc/clay-policy/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [ClayDB][clay_d_b_url]
+ [Realglobe, Inc.][realglobe,_inc__url]

[clay_d_b_url]: https://github.com/realglobe-Inc/claydb
[realglobe,_inc__url]: http://realglobe.jp

<!-- Links End -->
