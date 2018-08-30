
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