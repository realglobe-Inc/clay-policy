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
    rank: [ 'SUPER' ]
  })
  console.errors(error.detail.failures) // -> { rank: { reason: 'enums', expects: [ /* ... */ ], actual: 'ULTRA' } }
}

tryPolicy().catch((err) => console.error(err))

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.API.md.hbs" Start -->

<a name="section-doc-guides-03-a-p-i-md"></a>

API
---------

# clay-policy@1.1.1

Schema helpers for ClayDB resources

+ Functions
  + [create(args)](#clay-policy-function-create)
  + [isPolicy(obj)](#clay-policy-function-is-policy)
+ [`ClayPolicy`](#clay-policy-classes) Class
  + [new ClayPolicy(properties, options)](#clay-policy-classes-clay-policy-constructor)
  + [policy.validate(entity)](#clay-policy-classes-clay-policy-validate)
  + [policy.validateToThrow(entity)](#clay-policy-classes-clay-policy-validateToThrow)
  + [policy.clone()](#clay-policy-classes-clay-policy-clone)

## Functions

<a class='md-heading-link' name="clay-policy-function-create" ></a>

### create(args) -> `ClayPolicy`

Create a ClayPolicy instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |

<a class='md-heading-link' name="clay-policy-function-is-policy" ></a>

### isPolicy(obj) -> `boolean`



| Param | Type | Description |
| ----- | --- | -------- |
| obj | * |  |



<a class='md-heading-link' name="clay-policy-classes"></a>

## `ClayPolicy` Class

Type restrictions for clay entity




<a class='md-heading-link' name="clay-policy-classes-clay-policy-constructor" ></a>

### new ClayPolicy(properties, options)

Constructor of ClayPolicy class

| Param | Type | Description |
| ----- | --- | -------- |
| properties | Object | Property config |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-policy-classes-clay-policy-validate" ></a>

### policy.validate(entity) -> `PolicyError`

Validate an entity

| Param | Type | Description |
| ----- | --- | -------- |
| entity | ClayEntity | Entity to validate |


<a class='md-heading-link' name="clay-policy-classes-clay-policy-validateToThrow" ></a>

### policy.validateToThrow(entity)

Validate an entity and throw error if failed.

| Param | Type | Description |
| ----- | --- | -------- |
| entity | ClayEntity | Entity to validate |


<a class='md-heading-link' name="clay-policy-classes-clay-policy-clone" ></a>

### policy.clone() -> `ClayPolicy`

Clone this policy






<!-- Section from "doc/guides/03.API.md.hbs" End -->


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
