import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton from './MyButton';
import styles from '../styles/form/MyMenu.module.scss';

const MyMenu = ({name, danger, sm, menu, click, rev, isAuth, close}) => {
  const [visible, setVisible] = useState(false);

  //Закрытие меню при клике на wrapper
  useEffect(()=>{
    setVisible(false)
  },[close])

  function onVisible (vis, e) {
    e.stopPropagation()
    if(vis) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  let authStyle;
  
  if (isAuth) { authStyle = styles.menu__icon_auth } else { authStyle = styles.menu__icon};

  let menuItems;
  rev? menuItems = styles.menu__items_rev : menuItems = styles.menu__items;
  
  return (
    <div className={styles.menu} /* onBlur={() => setVisible(false)} */>
    {name
    ? <MyButton name={name} sm={sm} onClick = {(e) => onVisible(visible, e)} danger={danger} ></MyButton>
    : <div className={authStyle} onClick = {(e) => onVisible(visible, e)} ></div>
    }
    {visible &&
      <div className={menuItems}>
        {menu.map(item => 
          <Link className={styles.menu__link} key={item.id} to={item.route} onClick={(e)=> {setVisible(false, e); click(item)}}>{item.name}</Link>
        )}
      </div>
    }
  </div>
  );
};
export default MyMenu;