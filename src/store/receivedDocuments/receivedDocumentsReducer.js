import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  setDocumentsAction,
  getDocumentAction,
  updateDocumentsAction,
  clearDocumentsAction
} from './receivedDocumentsActions';

const authAdapter = createEntityAdapter();
const initialState = authAdapter.getInitialState({ documents: [] });

const ReceivedDocumentsSlice = createSlice({
  name: 'receiveDocuments',
  initialState,
  reducers: {
    setDocuments: setDocumentsAction,
    getDocument: getDocumentAction,
    updateDocuments: updateDocumentsAction,
    clearDocuments: clearDocumentsAction
  }
});

export const { setDocuments, getDocument, updateDocuments, clearDocuments } =
  ReceivedDocumentsSlice.actions;

export default ReceivedDocumentsSlice.reducer;
