export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_FAULTS':
            return(action.payload)
            
        case 'ADD_FAULTS':
            return([...state].concat(action.payload))

        case 'UPDATE_FAULTS':
            newState = state.map(fault=>{
                for(let newFault of action.payload){
                    if(newFault.FaultId == fault.FaultId)
                        return newFault;
                }
                return fault;
            })
            return(newState)
        case "REMOVE_FAULT":
            return [...state].filter(fault=> fault.RoomId == action.payload.RoomID)
        default:
            return state;
    }
} 