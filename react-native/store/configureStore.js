import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const composetEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export default () => {
    const store = createStore(
        reducer,
        composetEnhancers(applyMiddleware(thunk))
    )
    return store;
}