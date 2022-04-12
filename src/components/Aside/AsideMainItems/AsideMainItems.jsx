import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AsideChildItem from '../AsideChildItem/AsideChildItem';

const AsideMainItems = ({ element }) => {
  const [expanded, setExpanded] = useState(false);
  const { role } = useSelector((state) => state.auth.data);
  const handleChange = (el) => (event, isExpanded) => {
    setExpanded(isExpanded ? el.name : false);
  };
  const [lastActive, setLastActive] = useState(null);

  const removeActive = () => {
    if (lastActive) lastActive.classList.remove('aside-accordion-list-ul-li-active');
  };

  const setActive = (el) => (e) => {
    const li = e.target.closest('li');
    if (lastActive) {
      removeActive();
    }
    li.classList.add('aside-accordion-list-ul-li-active');
    setLastActive(li);
  };

  if (element.children) {
    return element.role.includes(role) ? (
      <Accordion
        className="aside-accordion"
        key={element.id}
        expanded={expanded === element.name}
        onChange={handleChange(element)}
      >
        <AccordionSummary
          className={expanded === element.name ? 'active' : ''}
          expandIcon={<ExpandMoreIcon className="aside-accordion-icon" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{element.name}</Typography>
        </AccordionSummary>
        <AccordionDetails className="aside-accordion-list">
          <ul className="aside-accordion-list-ul">
            {element.children.map((item) => {
              return <AsideChildItem childrenElement={item} setActive={setActive} />;
            })}
          </ul>
        </AccordionDetails>
      </Accordion>
    ) : (
      ''
    );
  }
  return (
    <NavLink
      to={element.url}
      key={element.id}
      className={expanded === element.name ? 'aside--menu-item active' : 'aside--menu-item'}
      onClick={handleChange(element)}
    >
      <Typography className="aside--menu-item-title">{element.name}</Typography>
    </NavLink>
  );
};

AsideMainItems.propTypes = {
  element: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        url: PropTypes.string
      })
    ),
    role: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string
  })
};

export default AsideMainItems;
