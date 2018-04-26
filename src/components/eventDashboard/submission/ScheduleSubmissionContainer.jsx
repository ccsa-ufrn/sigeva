import { connect } from 'react-redux';

import ScheduleSubmission from './ScheduleSubmission';
import { scheduleSubmissions, createSession, loadSessions, loadAllObjects, cancelSubmissionPresentation } from '../../../actions/submission';

const mapStateToProps = state => {
    return {
        submissions: state.submission,
        sessions: state.submission.sessions,
        allObjects: state.submission.allObjects,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadSessions: (entity) => {
          dispatch(loadSessions(entity));
        },
        createSession: (entity, date, shift, hour) => {
          dispatch(createSession(entity, date, shift, hour));
        },
        loadAllObjects: (entity) => {
          dispatch(loadAllObjects(entity));
        },    
        scheduleSubmissions: (entity, selectedSubmissions, sessions, location) => {
          dispatch(scheduleSubmissions(entity, selectedSubmissions, sessions, location));
        },
        cancelSubmissionPresentation: (entity, submissionId) => {
            dispatch(cancelSubmissionPresentation(entity, submissionId));
        },
      };
};

const ScheduleSubmissionContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScheduleSubmission);
export default ScheduleSubmissionContainer;
