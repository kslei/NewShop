import React, {useState, useEffect} from 'react';
import styles from '../styles/components/DiscountList.module.scss';
import DiscountItem from './DiscountItem';

const DiscountList = ({devices}) => {
  const [visible, setVisible] = useState(false);
  const [deviceRow, setDeviceRow] = useState([]);
  const [deviceVisible, setDeviceVisible] = useState([]);
  const [height, setHeight] = useState(0);
  let num = 4;
  
  if (window.innerWidth > 1399.98) { num = 4 } else {
    if (window.innerWidth > 767.98) { num = 3 } else {
      if (window.innerWidth > 480) { num = 2 } else {
        num = 1 } }
  } 
  
  devices = [... devices].sort((a,b)=>b.discount-a .discount)
 
  useEffect(()=>{
    setDevice()
  }, [visible])
  
  const setDevice = () => {
    let dev1 = []
    let dev2 = []
    if (devices.length <= num) {
      setDeviceRow(devices)
    } else {
      for(let i=0; i<devices.length; i++) {
        if (i<num) {
          dev1.push(devices[i])
        } else {
          dev2.push(devices[i])
        }
      }
      setDeviceRow(dev1)
      setDeviceVisible(dev2)
    }
  }
    
  return (
  <div className={styles.discountList}>
    <div className={styles.discountList__list} >
      {deviceRow.map((device, i) =>
        <DiscountItem key={device.id} device={device} width={100 / num} i={i} setheight={setHeight} />
      )}
    </div>
      <div className={styles.discountList__list} style={visible ? { height: `${(height+20) * (Math.ceil(devices.length / num) - 1)}px` } : { height: '0px'}}>
      {deviceVisible.map(device => 
        <DiscountItem key={device.id} device={device} width={100/num} />
      )}
    </div>
      {visible ? 
    <div className={styles.discountList__up} onClick={()=>{setVisible(false); window.scrollTo({left: 0, top: 350, behavior: 'smooth'})}}><div className={styles.icon__up}></div>Свернуть</div>
   :<div className={styles.discountList__down} onClick={()=>setVisible(true)}><div className={styles.icon__down}></div>Еще скидки</div>
    }
  </div>
  );
};
export default DiscountList;