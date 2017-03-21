# clay-policy@1.2.0

Schema helpers for ClayDB resources

+ Functions
  + [create(args)](#clay-policy-function-create)
  + [isPolicy(obj)](#clay-policy-function-is-policy)
+ [`ClayPolicy`](#clay-policy-class) Class
  + [new ClayPolicy(properties)](#clay-policy-class-clay-policy-constructor)
  + [policy.validate(entity)](#clay-policy-class-clay-policy-validate)
  + [policy.validateToThrow(entity)](#clay-policy-class-clay-policy-validateToThrow)
  + [policy.testRestriction(restriction, value)](#clay-policy-class-clay-policy-testRestriction)
  + [policy.clone()](#clay-policy-class-clay-policy-clone)

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


<a class='md-heading-link' name="clay-policy-class-clay-policy-testRestriction" ></a>

### policy.testRestriction(restriction, value) -> `Object`

Validate a property value

| Param | Type | Description |
| ----- | --- | -------- |
| restriction | PropertyRestriction | Property restriction |
| value | * | Property value |


<a class='md-heading-link' name="clay-policy-class-clay-policy-clone" ></a>

### policy.clone() -> `ClayPolicy`

Clone this policy



