import React, { useEffect, useState } from 'react';
import Image from '../forms/Image';
import Rotate from './Rotate';
import SliderIcon from './SliderIcon';
import styles from '../styles/components/RotateImage.module.scss';

const RotateImage = ({img, frames, images, onHide}) => {
  const [icons, setIcons] = useState([]);//массив иконок
  const [frameImage, setFrameImage] = useState(true);//выбор frame/image
  const [countImage, setCountImage] = useState(0);
  //set frames & images array
  if (frames.length !==0) {frames = frames.sort((a,b) => a.id - b.id);}
  if (images.length !==0) {images = images.sort((a,b) => a.id - b.id);}
  
  useEffect(()=>{
    onIcon()
  }, [frames, images])

  //set icons array
  function onIcon () {
    let arr = []
    if (frames.length !==0) {
      arr.push({src: frames[0].frame, type: 'frame'});
      setFrameImage(true)
    } else {
      setFrameImage(false)
    }
    if (images.length !==0) {
      images.forEach(element => {
        arr.push({src: element.img, type: 'image'})
      });
    }
    setIcons(arr)
  }

  //set image
  function setImage (item) {
    if (item.type === 'frame') {
      setFrameImage(true)
    } else {
      setFrameImage(false)
      for (let i=0; i<images.length; i++) {
        if (images[i].img === item.src) setCountImage(i)
      }
    }
  }
  //use device.img / use frames &(||) images
  if (images.length === 0 && frames.length === 0) {
    return (
      <div className={styles.rotateImage}>
          <Image src={process.env.REACT_APP_API_URL + img} />
      </div>
    );
  } else {
    return (
      <div className = {styles.rotateImage}>
        {frameImage 
        ? <Rotate frames={frames} />
          : <div onClick={()=>onHide(countImage)} style={{cursor: 'zoom-in'}}>
            <Image src={process.env.REACT_APP_API_URL + images[countImage].img} />
          </div>
        }
        {images.length !==0 &&
          <SliderIcon icons={icons} setImage={setImage}/>
        }
      </div>
    )
  } 
};
export default RotateImage;