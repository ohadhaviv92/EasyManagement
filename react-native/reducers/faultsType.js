export default (state = [] , action) => {

    switch (action.type) {

        case 'SET_FAULTS_TYPE':
            return(action.payload)
        default:
            return state;
    }
}