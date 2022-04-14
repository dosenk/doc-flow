import React from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import PageName from '../../components/PageName/PageName';
import cl from './receivedDoc.module.scss';
import { getNoun } from '../../utils/utils';
import { declinationOfIdent } from './receivedDocuments.const';
import { docSelectors } from '../../store/receivedDocuments/receivedDocumentsReducer';

const ReceivedDocuments = () => {
  const docs = useSelector(docSelectors.selectAll);

  return (
    <Grid className={cl.receivedDoc}>
      <PageName isLoading={false} value="Полученные документы" />
      <Box>
        <nav aria-label="secondary mailbox folders">
          <List>
            {docs.length ? (
              docs.map((item, idx) => {
                return (
                  <Box key={item.id}>
                    <ListItem divider>
                      <ListItemButton>
                        <ListItemText
                          primary={`Задани${item.otmList.length === 1 ? 'e' : 'я'} ${
                            item.iniciatorOfr
                          }`}
                          secondary={`${item.otmList.length}
                            ${getNoun(item.otmList.length, ...declinationOfIdent)}`}
                        />
                        <Box>
                          <Box className="documentIndex">{idx}</Box>
                          {/* <Box>2 идентификатора присутствуют в базе данных</Box> */}
                          <Box>{item.info?.base}</Box>
                        </Box>
                        <Box sx={{ marginLeft: '18px' }}>
                          {item.isVerified ? '' : <CircularProgress />}
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  </Box>
                );
              })
            ) : (
              <Box>
                <ListItem divider>
                  <ListItemButton>
                    <ListItemText primary="Документов для обработки не получено" />
                  </ListItemButton>
                </ListItem>
              </Box>
            )}
          </List>
        </nav>
      </Box>
    </Grid>
  );
};

ReceivedDocuments.propTypes = {};

export default ReceivedDocuments;
