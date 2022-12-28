import React from 'react';
import styles from '../styles/form/MyInput.module.scss';


const MyInput = React.forwardRef((props, ref) => {
  let style;
  props.sm ? style = styles.myInput_sm : style = styles.myInput
  return (
    <input className={style} {...props} ref={ref} />
  );
});
export default MyInput;