export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_ROOMS':
            return(action.payload)
        case 'ADD_ROOMS':
            return( { SiteID: state.SiteID, details: [...state.details].concat([...action.payload]) })
        case "REMOVE_ROOM":
            return  state.filter(item => item.RoomId != action.payload.RoomId);
        default:
            return state;
    }
}