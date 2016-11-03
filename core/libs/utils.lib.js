var utils = { };

/**
 * Transform commas in fields in spaces.
 * If list is defined, then remove words
 * in fields that are in list.
 */
utils.getFields = function(fields, list = []) {
    return fields.replace(/,/g, ' ');
}

module.exports = utils;