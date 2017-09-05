import User from './Event';

import async from 'async';


/**
 * Validates a field looking if
 */
const isBetweenLength = (field, min, max=255) => {
    field = field.trim(); // Removes spaces bars from the borders
    if (field.length < min || field.length > max) return false;
    return true;
};

/**
 * Creates a new Field Model instace storing a value and a request reference
 */
const createField = (fieldValue_, fieldRequestId_)=> {
    return new fieldModel({value: fieldValue_, request: fieldRequestId_});
};

const formatEvent = (eventObject_) => {
    return {
        name: eventObject_.name,
        subtitle: eventObject_.subtitle,
        active: eventObject_active,
        eventPeriod: eventObject_eventPeriod,
        registerPeriod: eventObject_registerPeriod
    };
};


export {isBetweenLength, createField, formatEvent};
