
export const onLogin = (UserDetails) => (dispatch) => {

    dispatch({
        type: 'LOGIN_USER',
        payload: UserDetails
    });

}
export const Logout = () => (dispatch) => {
    dispatch({
        type: 'LOGOUT'
    });

}


export const UpdateToken = (Token) => (dispatch) => {
    dispatch({
        type: 'UPDATE_TOKEN',
        payload: Token
    });

}

