import {combineReducers} from 'redux';
import user from './user';
import sites from './sites';
import rooms from './rooms';
import faults from './faults';
import jobs from './job';
import invites from './invites';
import roomsType from './roomsType';

const appReducer = combineReducers({
    user,
    sites,
    rooms,
    faults,
    jobs,
    invites,
    roomsType
})

export default (state , action) => {
    if(action.type === 'LOGOUT')
        state = {}
    return appReducer(state , action);
}