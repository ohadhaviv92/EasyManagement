export default (state = { sent: [], recevied: [] }, action) => {

    switch (action.type) {

        case 'SET_SENT_INVITES':
            return ({ sent: action.payload, recevied: state.recevied })

        case 'ADD_SENT_INVITES':
            return ({ sent: [...state.sent].concat(action.payload), recevied: state.recevied })

        case 'SET_RECIVE_INVITES':
            return ({sent: state.sent, recevied: action.payload })

        case 'DELETE_SENT_INVITE':
            let DeleteinviteIndex = -1;
            state.sent.forEach((invite, index)=>{

                if(invite.Site.SiteId == action.payload.siteId && invite.user.UserId == action.payload.reciverId)
                    DeleteinviteIndex = index;
            })
            let tempSent = [...state.sent]
            tempSent.splice(DeleteinviteIndex, 1);
            if(DeleteinviteIndex != -1)
                return ({sent: tempSent, recevied: state.recevied})

            return ({sent: state.sent, recevied: state.recevied })


        case 'DELETE_RECIVED_INVITE':
            let RejectinviteIndex = -1;
            state.recevied.forEach((invite, index)=>{

                if(invite.Site.SiteId == action.payload.siteId && invite.user.UserId == action.payload.reciverId)
                    RejectinviteIndex = index;
            })
            let tempRecived = [...state.recevied]
            tempRecived.splice(RejectinviteIndex, 1);
            if(RejectinviteIndex != -1)
                return ({sent: state.sent, recevied: tempRecived})

            return ({sent: state.sent, recevied: state.recevied })


        default:
            return state;
    }
}