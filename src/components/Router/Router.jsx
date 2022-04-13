import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../../layouts/Layout';
import Login from '../../pages/Login/Login';
import Preloader from '../Preloader/Preloader';
import Info from '../../pages/Info/Info';
import TableObjects from '../../pages/TableObjects/TableObjects';
import ReceivedDocuments from '../../pages/ReceivedDocuments/ReceivedDocuments';
import Users from '../../pages/Users/Users';

const Router = () => {
  const { isLogin, status } = useSelector((state) => state.auth);
  const isLoading = status === 'loading';

  return isLoading ? (
    <Preloader />
  ) : (
    <Routes>
      {isLogin ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Info />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="main">
            <Route index path="table" element={<TableObjects />} />
            <Route path="documents" element={<ReceivedDocuments />} />
            <Route path="*" element={<Navigate to="/main/table" replace />} />
          </Route>
          <Route path="administration">
            <Route index path="users" element={<Users />} />
            <Route path="*" element={<Navigate to="/administration/users" replace />} />
          </Route>
        </Route>
      ) : (
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
