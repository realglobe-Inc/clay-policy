/**
 * Policy failure reasons
 * @enum {string} Reasons
 */
'use strict'

/** Failure because type of the given value is not expected */
exports.UNEXPECTED_TYPE = 'UNEXPECTED_TYPE_ERROR'

/** Failure because the given value is not expected */
exports.UNEXPECTED_VALUE = 'UNEXPECTED_VALUE_ERROR'

/** Failure because the value out of range */
exports.OUT_OF_RANGE = 'OUT_OF_RANGE_ERROR'

/** Failure because the length of value out of range */
exports.LENGTH_OUT_OF_RANGE = 'LENGTH_OUT_OF_RANGE_ERROR'

/** Failure because an array passed to none-multiple field */
exports.MULTIPLE_NOT_ALLOWED = 'MULTIPLE_NOT_ALLOWED_ERROR'

/** Not matched the pattern */
exports.PATTERN_NOT_MATCHED = 'PATTERN_NOT_MATCHED_ERROR'
