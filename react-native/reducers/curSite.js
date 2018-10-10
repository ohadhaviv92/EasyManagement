export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_CUR_SITE':
            return(action.payload)
      
        default:
            return state;
    }
}