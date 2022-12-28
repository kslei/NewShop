import React from 'react';
import styles from '../styles/form/MyButton.module.scss'

const MyButton = ({name, danger, sm, onClick, props}) => {
  let style
  if(danger && !sm) {style = styles.myBtnDanger}
  if(danger && sm) {style = styles.myBtnDanger__sm}
  if(!danger && sm) {style = styles.myBtn__sm}
  if(!danger && !sm) {style = styles.myBtn}
    
  return (
    <button className={style} onClick = {() => onClick() } {...props}>
      {name}
    </button>
  );
};
export default MyButton;