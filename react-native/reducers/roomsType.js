export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_ROOMS_TYPE':
            return(action.payload)
        default:
            return state;
    }
}