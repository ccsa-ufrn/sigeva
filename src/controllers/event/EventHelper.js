import User from './Event'; // [MR] Sem coerência: User from Event?
// [MR] Evite o copy paste cego, pode causar problemas

import async from 'async'; // [MR] não está sendo utilizado

// [MR] Documentação incompleta
/**
 * Validates a field looking if
 */
const isBetweenLength = (field, min, max=255) => {
    // [MR] não se deve reassinar um parametro
    field = field.trim(); // Removes spaces bars from the borders
    if (field.length < min || field.length > max) return false;
    return true;
};

// [MR] esse método não está sendo utilizado em nenhum lugar
/**
 * Creates a new Field Model instace storing a value and a request reference
 */
const createField = (fieldValue_, fieldRequestId_)=> {
    return new fieldModel({value: fieldValue_, request: fieldRequestId_});
};

// [MR] Documentação é necessária
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
