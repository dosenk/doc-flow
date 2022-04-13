import React, { useState } from 'react';
import cl from './aside.module.scss';
import { MENU_LIST } from './aside.const';
import AsideMainItems from './AsideMainItems/AsideMainItems';

const Aside = () => {
  const [expanded, setExpanded] = useState('');

  const handleChange = (el) => (event, isExpanded) => {
    setExpanded(isExpanded ? el.name : '');
  };
  const [lastActive, setLastActive] = useState(null);

  const removeActive = () => {
    if (lastActive) lastActive.classList.remove(cl.aside_accordion_list_ul_li_active);
  };

  const setActive = () => (e) => {
    const li = e.target.closest('li');
    if (lastActive) {
      removeActive();
    }
    li.classList.add(cl.aside_accordion_list_ul_li_active);
    setLastActive(li);
  };

  return (
    <aside className={cl.aside}>
      <div>
        {MENU_LIST.map((el) => {
          return (
            <AsideMainItems
              key={el.name}
              element={el}
              expanded={expanded}
              handleChange={handleChange}
              setActive={setActive}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Aside;
