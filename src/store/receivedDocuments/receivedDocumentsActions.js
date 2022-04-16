import { createAsyncThunk } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import { addTaskApi } from '../../api/receivedDocumentsApi';

// eslint-disable-next-line import/prefer-default-export
export const addTaskAction = createAsyncThunk('auth/addTask', async (data, asd) => {
  const res = await addTaskApi(data);
  return res;
});

addTaskAction.prototype = {
  main: PropTypes.shape({}),
  base: PropTypes.shape({})
};
