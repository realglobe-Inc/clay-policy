# clay-policy@2.0.1

Schema helpers for ClayDB resources

+ Functions
  + [create(args)](#clay-policy-function-create)
  + [isPolicy(obj)](#clay-policy-function-is-policy)
+ [`ClayPolicy`](#clay-policy-class) Class
  + [new ClayPolicy(properties)](#clay-policy-class-clay-policy-constructor)
  + [policy.validate(entity)](#clay-policy-class-clay-policy-validate)
  + [policy.validateToThrow(entity)](#clay-policy-class-clay-policy-validateToThrow)
  + [policy.uniqueFilters(entity)](#clay-policy-class-clay-policy-uniqueFilters)
  + [policy.defaultsFor(entity)](#clay-policy-class-clay-policy-defaultsFor)
  + [policy.testRestriction(restriction, value)](#clay-policy-class-clay-policy-testRestriction)
  + [policy.hasRestrictionFor(name)](#clay-policy-class-clay-policy-hasRestrictionFor)
  + [policy.clone()](#clay-policy-class-clay-policy-clone)
  + [policy.toValues()](#clay-policy-class-clay-policy-toValues)
  + [policy.toDigest()](#clay-policy-class-clay-policy-toDigest)

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



<a class='md-heading-link' name="clay-policy-class"></a>

## `ClayPolicy` Class

Type restrictions for clay entity




<a class='md-heading-link' name="clay-policy-class-clay-policy-constructor" ></a>

### new ClayPolicy(properties)

Constructor of ClayPolicy class

| Param | Type | Description |
| ----- | --- | -------- |
| properties | Object | Property config |


<a class='md-heading-link' name="clay-policy-class-clay-policy-validate" ></a>

### policy.validate(entity) -> `PolicyError`

Validate an entity

| Param | Type | Description |
| ----- | --- | -------- |
| entity | ClayEntity | Entity to validate |


<a class='md-heading-link' name="clay-policy-class-clay-policy-validateToThrow" ></a>

### policy.validateToThrow(entity)

Validate an entity and throw error if failed.

| Param | Type | Description |
| ----- | --- | -------- |
| entity | ClayEntity | Entity to validate |


<a class='md-heading-link' name="clay-policy-class-clay-policy-uniqueFilters" ></a>

### policy.uniqueFilters(entity) -> `Array.<Object>`

Define unique filter objects for entity

| Param | Type | Description |
| ----- | --- | -------- |
| entity | ClayEntity | Entity to work with |


<a class='md-heading-link' name="clay-policy-class-clay-policy-defaultsFor" ></a>

### policy.defaultsFor(entity) -> `Object`

Get defaults values for an entity. This method does NOT update the passed entity

| Param | Type | Description |
| ----- | --- | -------- |
| entity | ClayEntity |  |


<a class='md-heading-link' name="clay-policy-class-clay-policy-testRestriction" ></a>

### policy.testRestriction(restriction, value) -> `Object`

Validate a property value

| Param | Type | Description |
| ----- | --- | -------- |
| restriction | PropertyRestriction | Property restriction |
| value | * | Property value |


<a class='md-heading-link' name="clay-policy-class-clay-policy-hasRestrictionFor" ></a>

### policy.hasRestrictionFor(name) -> `boolean`

Check if has restriction for a field

| Param | Type | Description |
| ----- | --- | -------- |
| name | string | Field name |


<a class='md-heading-link' name="clay-policy-class-clay-policy-clone" ></a>

### policy.clone() -> `ClayPolicy`

Clone this policy

<a class='md-heading-link' name="clay-policy-class-clay-policy-toValues" ></a>

### policy.toValues() -> `Object`

Convert into JSON compatible values

<a class='md-heading-link' name="clay-policy-class-clay-policy-toDigest" ></a>

### policy.toDigest() -> `string`

To digest string



