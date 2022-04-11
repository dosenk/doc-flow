import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import Router from './components/Router/Router';
import { checkAuthAction } from './store/auth/authActions';
// import { logout } from './store/auth/authReducer';
import { getAccessToken } from './services/auth.service';

const App = () => {
  const dispatch = useDispatch();
  console.log(1);
  useEffect(() => {
    console.log(getAccessToken());
    if (getAccessToken()) dispatch(checkAuthAction());
    // else dispatch(logout());
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
