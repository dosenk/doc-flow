import { SET_DOC, SET_SAVE_DOC } from './constatants/constatnts';

const initState = { documents: [], savedDocuments: [] };

export const setDocuments = (recoderState) => {
  return {
    type: SET_DOC,
    recoderState
  };
};

export const setSavedDocuments = (index) => {
  return {
    type: SET_SAVE_DOC,
    index
  };
};

const RecoderState = (action, state = initState) => {
  switch (action.type) {
    case SET_DOC: {
      action.recoderState.isVerified = false;
      state.documents.push(action.recoderState);
      return { ...state };
    }
    case SET_SAVE_DOC: {
      const obj = state.documents.splice(action.index, 1);
      state.savedDocuments.push(...obj);
      return { ...state };
    }
    default:
      return state;
  }
};

export default RecoderState;
