export const SetFaults = (Faults, RoomID) => (dispatch) => {
    dispatch({
        type: 'SET_FAULTS',
        payload: Faults,
        RoomID
    });
}

export const AddFaults = (Faults) => (dispatch) => {
    dispatch({
        type: 'ADD_FAULTS',
        payload: Faults
    });
}

export const RemoveFault = (Fault) => (dispatch) => {
    dispatch({
        type: 'REMOVE_FAULT',
        payload: Fault
    });
}


export const SetFaultTypes = (FaultTypes) => (dispatch) => {
    dispatch({
        type: 'SET_FAULTS_TYPE',
        payload: FaultTypes
    });
}