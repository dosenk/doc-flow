import React from 'react';
import { Box, ButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';
import DocButton from '../DocButton/DocButton';

const DocButtonGroup = ({ buttonsList, actions, isDisabled }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        background: '#fff'
      }}
    >
      {buttonsList.map((btnGroup, idx) => {
        const key = `btn-gr-${idx}`;

        return (
          <ButtonGroup style={{ marginRight: '5px' }} key={key} aria-label="button group">
            {btnGroup.map((button) => {
              return (
                <DocButton
                  size={button.size ? button.size : 'small'}
                  key={button.id}
                  variant={button.variant ? button.variant : 'contained'}
                  onClick={actions[button.action]}
                  disabled={isDisabled(button)}
                  color="primary"
                  style={{ marginRight: '2px' }}
                >
                  {button.name}
                </DocButton>
              );
            })}
          </ButtonGroup>
        );
      })}
    </Box>
  );
};

DocButtonGroup.propTypes = {
  buttonsList: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string,
        id: PropTypes.number,
        variant: PropTypes.string,
        action: PropTypes.string,
        name: PropTypes.string
      })
    )
  ),
  actions: PropTypes.instanceOf(Object),
  isDisabled: PropTypes.func
};

export default DocButtonGroup;
