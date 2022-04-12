import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const AsideChildItem = ({ childrenElement, setActive }) => {
  return (
    <li className="aside-accordion-list-ul-li" role="presentation" key={childrenElement.id}>
      <NavLink
        onClick={setActive(childrenElement)}
        to={childrenElement.url}
        key={childrenElement.id}
      >
        <Typography className="aside-item-title">{childrenElement.name}</Typography>
      </NavLink>
    </li>
  );
};

export default AsideChildItem;

AsideChildItem.propTypes = {
  childrenElement: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
    name: PropTypes.string
  }),
  setActive: PropTypes.func
};
