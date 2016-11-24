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

/**
 * Get the startup mode from server.
 * It's based in args on server init.
 */
utils.getStartUpMode = function() {
    let startUpMode = 'DEV';

    if(process.argv[2]) {
        let startUpModeTemp = process.argv[2].toUpperCase();
        
        if(startUpModeTemp === 'DEV' || startUpModeTemp === 'TEST' || startUpModeTemp === 'PRODUCTION') {
            startUpMode = startUpModeTemp;
        }
    }

    return startUpMode;
}

/**
 * Return true if arr is sorted,
 * return false otherwise.
 */
utils.isSorted = function(arr){    
    if(arr.length == 0) 
        return true;
    
    for (let i = 0; i < arr.length-1; i++)
        if(arr[i] > arr[i+1])
            return false;

    return true;
}

/**
 * It bootstraps the database to test system
 */
utils.bootstrapCollections = function(app) {

    let config = require('../config');
    let testHelperFunctions = require('./testHelperFunctions.lib');
    let User = require('../models/user.model');
    let fs = require('fs');
    let async = require('async');

    testHelperFunctions.createUsers(User, fs, async, function() {

        app.listen(config.SERVER_PORT, function() {
            console.log(`Express started on port ${config.SERVER_PORT}, on TEST mode.`);
        });

    });

}

module.exports = utils;