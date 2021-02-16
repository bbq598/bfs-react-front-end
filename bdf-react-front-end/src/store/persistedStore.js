import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reduxThunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import appReducer from '../reducers/reducer';
 
const persistConfig = {
  key: 'root',
  storage: storage,
}
 
const persistedReducer = persistReducer(persistConfig, appReducer)
 
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(reduxThunk));
  let persistor = persistStore(store);
  return { store, persistor }
}