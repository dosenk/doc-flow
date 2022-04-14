import { isSameValues } from '../utils/utils';
import {
  DOCUMENT_IN_PROCESS,
  NOTIFICATION_ERROR
} from '../hooks/useNotification/notification.constants';

export const listenQrEvent = (socket, dispatch, addDocument) => {
  socket.on('qrDataEvent', (args) => {
    // console.log(args);
    dispatch(addDocument(args));
    // if (isSameValues(recoderState.documents, args)) setDocuments(args);
    // else renderSnackBar(DOCUMENT_IN_PROCESS, NOTIFICATION_ERROR);
  });
};

export const listenInfoEvents = (socket) => {
  socket.on('infoEvent', (args) => {
    console.log(args);
  });
};
