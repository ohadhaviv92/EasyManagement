export const SetJobs = (Jobs) => (dispatch) => {
    dispatch({
        type: 'SET_JOBS',
        payload: Jobs
    });
}
