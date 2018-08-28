import { connect } from 'react-redux';

import ConsolidateObject from './ConsolidateObject';
import { createSession, loadSessions, loadAllObjects, consolidateActivity, deconsolidateActivity } from '../../../actions/activities';

const mapStateToProps = (state) => {
    return {
        sessions: state.activities.sessions,
        allObjects: state.activities.allObjects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSessions: (entity) => {
          dispatch(loadSessions(entity));
        },
        createSession: (entity, initialDate, finalDate) => {
          dispatch(createSession(entity, initialDate, finalDate));
        },
        loadAllObjects: (entity) => {
          dispatch(loadAllObjects(entity));
        },
        consolidateActivity: (entity, activityId, sessions, location, vacancies) => {
          dispatch(consolidateActivity(entity, activityId, sessions, location, vacancies));
        },
        deconsolidateActivity: (entity, activityId) => {
          dispatch(deconsolidateActivity(entity, activityId));
        }
    };
};

const ConsolidateObjectContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConsolidateObject);
export default ConsolidateObjectContainer;
