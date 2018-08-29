export default (state = {} , action) => {
  
    switch (action.type) {

        case 'LOGIN_USER':
            return({
                User: action.payload.User,
                Sites: action.payload.Sites,
            })
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}