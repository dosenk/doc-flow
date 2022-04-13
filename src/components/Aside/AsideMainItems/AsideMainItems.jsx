import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AsideChildItem from '../AsideChildItem/AsideChildItem';
import cl from '../aside.module.scss';

const AsideMainItems = ({ element, expanded, handleChange, setActive }) => {
  const { role } = useSelector((state) => state.auth.data);

  if (element.children) {
    return element.role.includes(role) ? (
      <Accordion
        className={cl.aside_accordion}
        key={element.id}
        expanded={expanded === element.name}
        onChange={handleChange(element)}
        color="primary"
      >
        <AccordionSummary
          className={expanded === element.name ? 'active' : ''}
          expandIcon={<ExpandMoreIcon className={cl.aside_accordion_icon} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          color="primary"
        >
          <Typography>{element.name}</Typography>
        </AccordionSummary>
        <AccordionDetails className={cl.aside_accordion_list}>
          <ul className={cl.aside_accordion_list_ul}>
            {element.children.map((item) => {
              return (
                <AsideChildItem key={item.name} childrenElement={item} setActive={setActive} />
              );
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
      className={
        expanded === element.name ? `${cl.aside__menu_item} ${cl.active}` : cl.aside__menu_item
      }
      onClick={handleChange(element)}
    >
      <Typography className={cl.aside__menu_item_title}>{element.name}</Typography>
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
    role: PropTypes.instanceOf(Array),
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string
  }),
  expanded: PropTypes.string,
  handleChange: PropTypes.func,
  setActive: PropTypes.func
};

export default AsideMainItems;
