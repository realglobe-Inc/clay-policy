/**
 * Policy failure reasons
 * @enum {string} Reasons
 */
'use strict'

/** Failure because type of the given value is not expected */
exports.UNEXPECTED_TYPE = 'type:unexpected'

/** Failure because the given value is not expected */
exports.UNEXPECTED_VALUE = 'value:unexpected'

/** Failure because the value out of range */
exports.OUT_OF_RANGE = 'range:out'

/** Failure because the length of value out of range */
exports.LENGTH_OUT_OF_RANGE = 'length:range:out'

/** Failure because an array passed to none-multiple field */
exports.MULTIPLE_NOT_ALLOWED = 'multiple:not-allowed'
