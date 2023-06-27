import React, {useState, useEffect} from 'react';
import styles from '../styles/components/FutorInfo.module.scss';

const FutorInfo = ({info, title, it}) => {
  const [visible, setVisible] = useState(false);

  window.addEventListener('resize', function () {
    width();
  });

  let style;

  if(it) {
    style = [styles.futorInfo__title__it];
  } else {
    style = [styles.futorInfo__title];
  }
  
  //set visible information
  function width() {
    let w = window.innerWidth;
    if (w >= 667) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  useEffect(() => {
    width()
  }, [])

  function onVisible(vis) {
    if(window.innerWidth<667) {
      if (vis) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }
  }
  
  return (
    <div className={styles.futorInfo}>
      <div className={style} onClick={() => onVisible(visible)}>{title}</div>
      {visible && <div>
        {info.map(item => 
          <div key={item.id} className={styles.futorInfo__link} >{item.info}</div>
        )}
      </div>}
    </div>
  );
};
export default FutorInfo;