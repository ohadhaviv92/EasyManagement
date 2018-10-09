export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_FAULTS':
            return(action.payload)
            
        case 'ADD_FAULTS':
            return([...state].concat(action.payload))
        case "REMOVE_FAULT":
            faultIndex = state.filter((item, index)=> {return item.RoomId == action.payload.RoomID ? index : -1})
            if(faultIndex == -1)
                return state;
            return state.splice(faultIndex, 1);
        default:
            return state;
    }
}