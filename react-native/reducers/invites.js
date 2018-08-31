export default (state = { sent: [], recevied: [] }, action) => {

    switch (action.type) {

        case 'SET_SENT_INVITES':
            return ({ sent: action.payload, recevied: state.recevied })
        case 'SET_RECIVE_INVITES':
            return ({sent:state.sent, recevied: action.payload })
        default:
            return state;
    }
}