import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Aside from '../components/Aside/Aside';
import cl from './layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <Grid container className={cl.mainLayout}>
        <Grid container item xs={2}>
          <Aside />
        </Grid>
        <Grid container item xs={10}>
          <Outlet />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Layout;
