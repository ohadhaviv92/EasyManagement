export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_CUR_TYPE':
            return(action.payload)
      
        default:
            return state;
    }
}