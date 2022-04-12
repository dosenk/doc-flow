import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../../layouts/Layout';
import Main from '../../pages/Main/Main';
import Login from '../../pages/Login/Login';
import Preloader from '../Preloader/Preloader';

const Router = () => {
  const { isLogin, status } = useSelector((state) => state.auth);
  const isLoading = status === 'loading';

  return isLoading ? (
    <Preloader />
  ) : (
    <Routes>
      {isLogin ? (
        <Route path="/" element={<Layout />}>
          <Route index path="main" element={<Main />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
          <Route path="/" element={<Navigate to="/main" replace />} />
        </Route>
      ) : (
        <Route path="/">
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
