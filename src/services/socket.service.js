import Socket from '../components/Websocket/Websocket';
import { isSameValues } from '../utils/utils';
import {
  DOCUMENT_IN_PROCESS,
  NOTIFICATION_ERROR
} from '../hooks/useNotification/notification.constants';

export const listenQrEvent = (socket, recoderState, renderSnackBar, setDocuments) => {
  Socket.on('qrDataEvent', (args) => {
    if (isSameValues(recoderState.documents, args)) setDocuments(args);
    else renderSnackBar(DOCUMENT_IN_PROCESS, NOTIFICATION_ERROR);
  });
};

export const listenInfoEvents = (Socket) => {
  Socket.on('infoEvent', (args) => {
    console.log(args);
  });
};
