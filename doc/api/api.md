# clay-policy@1.1.3

Schema helpers for ClayDB resources

+ Functions
  + [create(args)](#clay-policy-function-create)
  + [isPolicy(obj)](#clay-policy-function-is-policy)
+ [`ClayPolicy`](#clay-policy-classes) Class
  + [new ClayPolicy(properties, options)](#clay-policy-classes-clay-policy-constructor)
  + [policy.validate(entity)](#clay-policy-classes-clay-policy-validate)
  + [policy.validateToThrow(entity)](#clay-policy-classes-clay-policy-validateToThrow)
  + [policy.testRestriction(restriction, value)](#clay-policy-classes-clay-policy-testRestriction)
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


<a class='md-heading-link' name="clay-policy-classes-clay-policy-testRestriction" ></a>

### policy.testRestriction(restriction, value) -> `Object`

Validate a property value

| Param | Type | Description |
| ----- | --- | -------- |
| restriction | PropertyRestriction | Property restriction |
| value | * | Property value |


<a class='md-heading-link' name="clay-policy-classes-clay-policy-clone" ></a>

### policy.clone() -> `ClayPolicy`

Clone this policy



