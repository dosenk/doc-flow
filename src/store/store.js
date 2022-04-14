import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import receivedDocumentsReducer from './receivedDocuments/receivedDocumentsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer,
  receivedDocuments: receivedDocumentsReducer
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
