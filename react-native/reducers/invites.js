export default (state = { sent: [], recevied: [] }, action) => {

    switch (action.type) {

        case 'SET_SENT_INVITES':
            return ({ sent: action.payload, recevied: state.recevied })

        case 'ADD_SENT_INVITES':
            return ({ sent: [...state.sent].concat(action.payload), recevied: state.recevied })

        case 'SET_RECIVE_INVITES':
            return ({sent: state.sent, recevied: action.payload })

        case 'DELETE_SENT_INVITE':
            return ({sent: [...state.sent].filter(invite=>(invite.Site.SiteId != action.payload.siteId && invite.user.UserId != action.payload.reciverId)), recevied: state.recevied})
        case 'DELETE_RECIVED_INVITE':
            
        return ({sent: state.sent, recevied: [...state.recevied].filter(invite=>(invite.Site.SiteId != action.payload.siteId && invite.user.UserId != action.payload.reciverId))} )


        default:
            return state;
    }
}