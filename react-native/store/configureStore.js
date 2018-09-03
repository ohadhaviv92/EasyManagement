import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composetEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, reducer)
  
  export default () => {
    const store = createStore(
        persistedReducer,
        composetEnhancers(applyMiddleware(thunk))
    )
    const persistor = persistStore(store)
    return { store, persistor }
  }

