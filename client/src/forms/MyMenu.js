import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton from './MyButton';
import styles from '../styles/form/MyMenu.module.scss';

const MyMenu = ({name, danger, sm, menu, click, rev, icon}) => {
  const [visible, setVisible] = useState(false);
  
  function onVisible (vis) {
    if(vis) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  let menuItems;
  rev? menuItems = styles.menu__items_rev : menuItems = styles.menu__items;
  
  return (
  <div className={styles.menu}>
    {name
    ? <MyButton name={name} sm={sm} onClick = {() => onVisible(visible)} danger={danger} ></MyButton>
    : <img className={styles.menu__icon} src={icon} onClick = {() => onVisible(visible)} ></img>
    }
    {visible &&
      <div className={menuItems}>
        {menu.map(item => 
          <Link className={styles.menu__link} key={item.id} to={item.route} onClick={()=> {setVisible(false); click(item)}}>{item.name}</Link>
        )}
      </div>
    }
  </div>
  );
};
export default MyMenu;