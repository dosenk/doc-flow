import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { $api } from '../../api/api';
import Table from '../../components/Table/Table';
import { BTNS, TABLE_COLUMNS, ROLE } from './user.constants';
import Preloader from '../../components/Preloader/Preloader';
import PageName from '../../components/PageName/PageName';
import DocButtonGroup from '../../components/FormElements/DocButtonGroup/DocButtonGroup';
import { isBtnDisabled } from './user.services';

const Users = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRefresh = () => {
    if (!isLoading) setIsLoading(true);
    setSelectedRow(null);
    $api
      .get('/api/user')
      .then(({ data }) => {
        setUsers(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = () => {
    // openPopup({
    //   title: 'Добавить пользователя',
    //   action: 'ADD_USER',
    //   url: '/api/user',
    //   listUserRole: ROLE,
    //   callback: handleRefresh,
    //   typeButton: 'сохранить',
    //   text: `куда текст ?`
    //   // notificationText: interfaceNotificationText[action],
    // });
  };
  const handleDel = () => {
    if (!isLoading) setIsLoading(true);
    const send = { login: selectedRow.original.login };
    $api.delete('/api/user', send).then((data) => {
      console.log(data);
      if (data.affectedRows) handleRefresh();
    });
  };

  useEffect(handleRefresh, []);

  const actions = { handleRefresh, handleDel, handleAdd };

  const handleDisable = (btn) => {
    return isBtnDisabled(selectedRow, isLoading, btn);
  };

  return (
    <Grid style={{ height: '100%', width: '100%' }}>
      <PageName value="Пользователи" isLoading={isLoading} />
      <Box sx={{ marginTop: '5px' }}>
        <DocButtonGroup buttonsList={BTNS} actions={actions} isDisabled={handleDisable} />
      </Box>
      {isLoading && !users.length ? (
        <Preloader />
      ) : (
        <Box sx={{ marginTop: '5px' }}>
          <Table
            isLoading={isLoading}
            columns={TABLE_COLUMNS}
            data={users}
            onclick={(row) => {
              row.toggleRowSelected();
              setSelectedRow(row);
            }}
            multipleSelector={false}
            sortBy={TABLE_COLUMNS[0].accessor}
            rowsPerPageOptions={[10]}
            isResetSelectedRow={false}
          />
        </Box>
      )}
    </Grid>
  );
};

export default Users;

Users.propTypes = {};
