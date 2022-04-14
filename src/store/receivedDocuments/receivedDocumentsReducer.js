import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  setDocumentsAction,
  getDocumentAction,
  updateDocumentsAction,
  clearDocumentsAction
} from './receivedDocumentsActions';

export const documentsAdapter = createEntityAdapter({
  selectId: (doc) => doc.id
});

const initialState = documentsAdapter.getInitialState({ loading: 'idle' });
export const docSelectors = documentsAdapter.getSelectors((state) => state.receivedDocuments);

const ReceivedDocumentsSlice = createSlice({
  name: 'receivedDocuments',
  initialState,
  reducers: {
    addDocument: documentsAdapter.addOne
    // updateDocuments: updateDocumentsAction,
    // clearDocuments: clearDocumentsAction
  }
});

export const { addDocument, getDocument, updateDocuments, clearDocuments } =
  ReceivedDocumentsSlice.actions;

export default ReceivedDocumentsSlice.reducer;
