import React from 'react';
import { Grid } from '@mui/material';
import PageName from '../../components/PageName/PageName';
import cl from './receivedDoc.module.scss';

const ReceivedDocuments = () => {
  return (
    <Grid className={cl.receivedDoc}>
      <PageName isLoading={false} value="Полученные документы" />
    </Grid>
  );
};

ReceivedDocuments.propTypes = {};

export default ReceivedDocuments;
