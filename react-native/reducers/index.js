import {combineReducers} from 'redux';
import user from './user';
import sites from './sites';
import rooms from './rooms';

const appReducer = combineReducers({
    user,
    sites,
    rooms
})

export default (state , action) => {
    if(action.type === 'LOGOUT')
        state = {}
    return appReducer(state , action);
}