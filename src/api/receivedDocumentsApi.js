import { $api } from './api';

// eslint-disable-next-line import/prefer-default-export
export const addTaskApi = async (data) => {
  try {
    return await $api.post(`/api/tasks`, data);
  } catch (e) {
    return e.response.data;
  }
};
