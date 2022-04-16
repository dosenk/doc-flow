import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addTaskAction } from './receivedDocumentsActions';

export const documentsAdapter = createEntityAdapter({
  selectId: (doc) => doc.base.id
});

const initialState = documentsAdapter.getInitialState();
export const docSelectors = documentsAdapter.getSelectors((state) => state.receivedDocuments);

const ReceivedDocumentsSlice = createSlice({
  name: 'receivedDocuments',
  initialState,
  reducers: {
    addDocument: (state, action) => {
      action.payload.isVerified = false;
      documentsAdapter.addOne(state, action);
    },
    updateDocument: documentsAdapter.updateOne
    // getDocument: (state, action) => {
    //   console.log(state)
    // }
  },
  extraReducers(builder) {
    builder
      // sign In
      .addCase(addTaskAction.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(addTaskAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLogin = true;
        console.log(action.payload.data);
        state.error = '';
        // state.data = action.payload;
      })
      .addCase(addTaskAction.rejected, (state, action) => {
        state.status = 'failed';
        state.isLogin = false;
        state.error = action.error.message;
      });
  }
});

export const { addDocument, updateDocument } = ReceivedDocumentsSlice.actions;

export default ReceivedDocumentsSlice.reducer;
