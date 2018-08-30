export default (state = {} , action) => {
  
    switch (action.type) {

        case 'LOGIN_USER':
            return(action.payload)
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}