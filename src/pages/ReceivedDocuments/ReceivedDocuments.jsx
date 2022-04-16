import React from 'react';
import { Box, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import PageName from '../../components/PageName/PageName';
import cl from './receivedDoc.module.scss';
import { docSelectors } from '../../store/receivedDocuments/receivedDocumentsReducer';
import DocumentItem from './DocumentItem/DocumentItem';

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
                return <DocumentItem key={item.base.id} item={item} idx={idx} />;
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
