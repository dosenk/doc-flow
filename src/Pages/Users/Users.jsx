import { connect } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { $api } from '../../api/api';
import Table from '../../components/Table/Table';
import { BTNS, TABLE_COLUMNS, ROLE } from './user.constants';
import Preloader from '../../components/Preloader/Preloader';
import { popupActionCreators } from '../../store/popup';
import PageName from '../../Components/PageName/PageName';

const Users = ({ openPopup }) => {
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
    openPopup({
      title: 'Добавить пользователя',
      action: 'ADD_USER',
      url: '/api/user',
      listUserRole: ROLE,
      callback: handleRefresh,
      typeButton: 'сохранить',
      text: `куда текст ?`
      // notificationText: interfaceNotificationText[action],
    });
  };
  const handleDel = () => {
    if (!isLoading) setIsLoading(true);
    const send = { login: selectedRow.original.login };
    $api.delete('/api/user', send).then((data) => {
      console.log(data);
      if (data.affectedRows) handleRefresh();
    });
    //  api("/qr/user", "DELETE", {
    //    login: selectedRow.original.login,
    //  }).then((data) => {
    //    if (data.affectedRows) handleRefresh();
    //  });
  };

  useEffect(handleRefresh, []);

  const btnsAction = { handleRefresh, handleDel, handleAdd };

  const renderBtns = useCallback(() => {
    return BTNS.map((btn) => {
      return (
        <Button
          key={btn.name}
          color="secondary"
          style={{ marginRight: '5px' }}
          variant="contained"
          onClick={btnsAction[btn.action]}
          disabled={(btn.id === 2 && selectedRow === null) || isLoading}
        >
          {btn.name}
        </Button>
      );
    });
  }, [btnsAction, selectedRow]);

  return (
    <Grid style={{ height: '100%' }}>
      <PageName value="Пользователи" />
      <Box sx={{ marginTop: '5px' }}>{renderBtns()}</Box>
      {isLoading && !users.length ? (
        <Preloader />
      ) : (
        <Box sx={{ marginTop: '10px' }}>
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
            //   style={{ footer: { position: "absolute", bottom: "-4px", right: "0" } }}
          />
        </Box>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    popup: state.popup,
    popupInformation: state.popup.popupInformation
  };
};

export default connect(mapStateToProps, popupActionCreators)(Users);

Users.propTypes = {
  openPopup: PropTypes.func.isRequired
};
