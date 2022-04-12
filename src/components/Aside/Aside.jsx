import React from 'react';
import cl from './aside.module.scss';
import { MENU_LIST } from './aside.const';
import AsideMainItems from './AsideMainItems/AsideMainItems';

const Aside = () => {
  return (
    <aside className={cl.aside}>
      <div className="aside--menu">
        {MENU_LIST.map((el) => {
          return <AsideMainItems element={el} />;
        })}
      </div>
    </aside>
  );
};

export default Aside;
