import React from 'react';
import styles from '../styles/form/FileInput.module.scss';


const FileInput = React.forwardRef((props, ref) => {
  
  return (
    <div className={styles.file}>
      <label htmlFor="file" className={styles.file__label} >
        <span className={styles.file__text}>{props.name}</span>
        <input className={styles.file__file} id="file" type='file' {...props} ref={ref} />
      </label>
    </div>
    
  );
});
export default FileInput;