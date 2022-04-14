import React, { useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import Router from './components/Router/Router';
import { listenInfoEvents, listenQrEvent } from './services/socket.service';
import Websocket from './components/Websocket/Websocket';
import useNotification from './hooks/useNotification/useNotification';
import { addDocument } from './store/receivedDocuments/receivedDocumentsReducer';

const App = () => {
  const renderSnackBar = useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    listenQrEvent(Websocket, dispatch, addDocument);
    listenInfoEvents(Websocket);
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
