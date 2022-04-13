import React from 'react';
import { Grid } from '@mui/material';
import cl from './tableObj.module.scss';
import PageName from '../../components/PageName/PageName';

const TableObjects = () => {
  return (
    <Grid className={cl.tableObj}>
      <PageName isLoading={false} value="Таблица объектов" />
    </Grid>
  );
};

TableObjects.propTypes = {};

export default TableObjects;
