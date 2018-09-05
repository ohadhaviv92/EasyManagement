import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, reducer)
  
  export default () => {
    const store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(thunk))
    )
    const persistor = persistStore(store)
    return { store, persistor }
  }

