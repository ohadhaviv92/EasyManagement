import {combineReducers} from 'redux';
import user from './user';
import sites from './sites';
import rooms from './rooms';
import faults from './faults';
import jobs from './job';

const appReducer = combineReducers({
    user,
    sites,
    rooms,
    faults,
    jobs
})

export default (state , action) => {
    if(action.type === 'LOGOUT')
        state = {}
    return appReducer(state , action);
}