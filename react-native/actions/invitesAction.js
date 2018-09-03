export const SetSentInvites = (Invites) => (dispatch) => {
    dispatch({
        type: 'SET_SENT_INVITES',
        payload: Invites
    });
}

export const SetReciveInvites = (Invites) => (dispatch) => {
    dispatch({
        type: 'SET_RECIVE_INVITES',
        payload: Invites
    });
}


export const AddSentInvites = (Invites) => (dispatch) => {
    dispatch({
        type: 'ADD_SENT_INVITES',
        payload: Invites
    });
}