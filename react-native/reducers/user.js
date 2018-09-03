export default (state = {}, action) => {

    switch (action.type) {

        case 'LOGIN_USER':
            return (action.payload)
        case 'UPDATE_TOKEN':
            return ({...state , Token: action.payload})
        case "LOGOUT":
            return {};
        default:
            return state;
    }
}