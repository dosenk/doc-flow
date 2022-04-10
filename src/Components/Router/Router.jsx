import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import Main from '../../Pages/Main/Main';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/main" element={<Main />} />
      </Route>
      {/* <Route path="/main" element={<Layout />}> */}
      {/*  <Route path="/table" element={<TableObjects />} /> */}
      {/*  <Route path="/recivedDocuments" element={<ReceivedDocuments />} /> */}
      {/* </Route> */}
      {/* <Route path="/administration" element={<Layout />}> */}
      {/*  <Route path="/users" element={<Users />} /> */}
      {/* </Route> */}
    </Routes>
  );
};

export default Router;
