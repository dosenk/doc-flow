import React from 'react';
import { Grid } from '@mui/material';
import cl from './info.module.scss';
import PageName from '../../components/PageName/PageName';

const Info = () => {
  return (
    <Grid className={cl.info}>
      <PageName isLoading={false} value="Инфо" />
    </Grid>
  );
};

Info.propTypes = {};

export default Info;
