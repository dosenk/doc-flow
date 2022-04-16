import React, { useEffect } from 'react';
import { Box, CircularProgress, ListItem, ListItemButton, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getNoun, sleep } from '../../../utils/utils';
import { declinationOfIdent } from '../receivedDocuments.const';
import { updateDocument } from '../../../store/receivedDocuments/receivedDocumentsReducer';
import { addTaskAction } from '../../../store/receivedDocuments/receivedDocumentsActions';

const DocumentItem = ({ item, idx }) => {
  const dispatch = useDispatch();
  console.log(item);
  const { base, decree, figurant, iniciator, iniciatorAdd, main, prosecutor, isVerified } = item;

  useEffect(() => {
    sleep(1000).then(() => {
      dispatch(updateDocument({ id: item.base.id, changes: { isVerified: true } }));
    });
  }, []);

  useEffect(() => {
    if (isVerified) dispatch(addTaskAction(item));
  }, [isVerified]);

  return (
    <Box>
      <ListItem divider>
        <ListItemButton>
          <ListItemText
            primary={`Задани${main.otmList.length === 1 ? 'e' : 'я'}: ${iniciator.ofr} - ${
              iniciator.name
            }`}
            secondary={`${main.otmList.length}
                          ${getNoun(main.otmList.length, ...declinationOfIdent)}`}
          />
          <Box>
            <Box className="documentIndex">{idx}</Box>
            {/* <Box>2 идентификатора присутствуют в базе данных</Box> */}
            <Box>{`${base.type} ${base.number}`}</Box>
          </Box>
          <Box sx={{ marginLeft: '18px' }}>{isVerified ? '' : <CircularProgress />}</Box>
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

DocumentItem.propTypes = {
  item: PropTypes.shape({
    base: PropTypes.shape({
      id: PropTypes.string,
      number: PropTypes.string,
      type: PropTypes.string
    }),
    decree: PropTypes.shape({}),
    figurant: PropTypes.shape({}),
    iniciator: PropTypes.shape({ name: PropTypes.string, ofr: PropTypes.string }),
    iniciatorAdd: PropTypes.shape({}),
    main: PropTypes.shape({ otmList: PropTypes.instanceOf(Array) }),
    prosecutor: PropTypes.shape({}),
    isVerified: PropTypes.bool
  }),
  idx: PropTypes.number
};

export default DocumentItem;
