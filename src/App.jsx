import React, { useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import Router from './components/Router/Router';
import { listenInfoEvents, listenQrEvent } from './services/socket.service';
import Websocket from './components/Websocket/Websocket';
import useNotification from './hooks/useNotification/useNotification';

const App = () => {
  const renderSnackBar = useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    listenQrEvent(Websocket, dispatch, useSelector, renderSnackBar);
    listenInfoEvents(Websocket);
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
