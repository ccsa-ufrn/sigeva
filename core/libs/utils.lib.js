var utils = { };

/**
 * Transform commas in fields in spaces.
 * @param {number} a
 * @param {number} b
 * @description Transform commas in fields in spaces.
 */
utils.getFields = function(fields, blacklist = []) {
    if(fields === undefined || fields === null) return fields;

    fields = fields.split(',');
    for(let i = 0; i < fields.length; ++i) {
        for(let j = 0; j < blacklist.length; ++j) {
            if(fields[i].trim() === blacklist[j]) { fields.splice(i--,1); break; } 
        }
    }

    return fields.join(' ');
}

module.exports = utils;