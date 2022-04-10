import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RecoderState from './recoderState';
import MainMenu from './mainMenu';
import authReducer from './auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  recoderState: RecoderState,
  mainMenu: MainMenu,
  auth: authReducer
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
