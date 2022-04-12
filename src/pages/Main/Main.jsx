import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@mui/material';
import React from 'react';
import PageName from '../../components/PageName/PageName';

function Main() {
  return (
    <Grid style={{ width: 'inherit' }}>
      <PageName value="Документооборот" isLoading={false} />
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  recoderState: state.recoderState
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
