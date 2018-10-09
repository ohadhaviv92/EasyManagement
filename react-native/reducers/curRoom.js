export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_CUR_ROOM':
            return(action.payload)
      
        default:
            return state;
    }
}