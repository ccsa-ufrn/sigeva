import { connect } from 'react-redux';

import ConsolidateObject from './ConsolidateObject';
import { createSession, loadSessions, loadAllObjects } from '../../../actions/activities';

const mapStateToProps = (state) => {
    return {
        sessions: state.submissions.sessions,
        allObjects: state.submissions.allObjects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSessions: (entity) => {
          dispatch(loadSessions(entity));
        },
        createSession: (entity, date, shift) => {
          dispatch(createSession(entity, date, shift));
        },
        loadAllObjects: (entity) => {
          dispatch(loadAllObjects(entity));
        }    
      };
};

const ConsolidateObjectContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConsolidateObject);
export default ConsolidateObjectContainer;
