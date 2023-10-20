import React, { useEffect, useState } from 'react';
import variable from '../styles/components/MyLanguage.module.scss';
import styles from '../styles/components/MyLanguage.module.scss';

const MyLanguage = (props) => {
  const[show, setShow] = useState(false);
  const [height, setHeight] = useState(0);
  const [disabled, setDisabled] = useState(false);
  
  let style = {
    '--color': props.color,
    '--border': props.border,
    '--background': 'transparent',
    '--hover': props.underscore ? props.hover : 'white',
    '--borderhover': props.borderhover || '',
    '--backgroundhover': props.backgroundhover,
    '--active': props.underscore ? props.active : 'white',
    '--backgroundactive': props.backgroundactive,
    '--borderactive': props.borderactive,
    '--bottom': props.underscore ? props.underscore : '',
    '--bottomactive': props.active,
  }
  let styleLi = {
    '--color': props.color,
    '--background': props.background,
    '--hover': props.hover,
    '--backgroundhover': 'white',
    '--active': props.active,
    '--backgroundactive': 'white',
    '--borderactive': props.borderactive,
  }

  let fontsize = Number(variable.fontSize.split('px')[0]);
  let padding = Number(variable.padding.split('px')[0]);
  let bottom;
  let top;

  props.upDown === 'up' ? bottom = variable.indent : top = variable.indent;
  
  if (props.size === 'sm') {
    padding = Number(variable.paddingsm.split('px')[0]);
    style.padding = `${padding}px ${padding + 1}px`;
    style.borderRadius = 0;
    styleLi.padding = padding;
    props.upDown === 'up' ? bottom = variable.indentsm : top = variable.indentsm;
  }

  useEffect(() => {
    if (show) {
      let size = props.menu.length * (fontsize + 2 * padding);
      setHeight(size);
    }
  }, [show])

  const onShow = (showed) => {
    if (showed) {
      setShow(true);
    } else {
      setDisabled(true)
      setHeight(0);
      setTimeout(() => {
        setShow(false);
        setDisabled(false)
      }, 300)
    }
  }

  
  return (
    <div className={styles.myMenu}>
      <button className={styles.button} style={style} onClick={() => onShow(!show)} disabled={disabled} onBlur={() => onShow(false)}><img src={props.name}/></button>
      {show &&
        <ul style={{ height: `${height}px`, bottom: bottom, top: top }} className={styles.list} onClick={() => onShow(false)}>
          {props.menu.map(item =>
            <li key={item.id} value={item.value} style={styleLi} onClick={() => props.setvalue(item.value)}>{item.name}</li>
          )}
        </ul>}
    </div>
  );
};
export default MyLanguage;