import React, { useContext, useEffect, useState } from 'react';
import { fetchTypes, fetchBrands, createDevice } from '../../http/deviceAPI';
import { Context } from '../../index';
import MyButton from '../../forms/MyButton';
import MyInput from '../../forms/MyInput';
import MyMenu from '../../forms/MyMenu';
import { observer } from 'mobx-react-lite';
import styles from '../../styles/components/MyModal.module.scss';

const CreateDevice = observer(({show, onHide, setErrorMessage}) => {
  const {device} = useContext(Context);
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [number, setNumber] = useState(0)
  const [info, setInfo] = useState([])
  const [typeDanger, setTypeDanger] = useState (false)
  const [brandDanger, setBrandDanger] = useState(false)
  //validation states
  const [nameError, setNameError] = useState('Имя не может быть пустым')
  const [priceError, setPriceError] = useState('Цена не может быть ниже или равна 0')
  const [numberError, setNumberError] = useState('Количество не может быть ниже 1 или не целое')
  const [fileError, setFileError] = useState('Файл не может быть пустым')
  const [typeError, setTypeError] = useState('Тип не может быть пустой')
  const [brandError, setBrandError] = useState('Бренд не может быть пустой')
  const [nameDirty, setNameDirty] = useState(false)
  const [priceDirty, setPriceDirty] = useState(false)
  const [numberDirty, setNumberDirty] = useState(false)
  const [fileDirty, setFileDirty] = useState(false)
  //disabled add button 
  const [disabled, setDisabled] = useState(false)
  //message state
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (nameError || priceError || numberError || fileError) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [nameError, priceError, numberError, fileError])

  //onblur event handling
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true)
      break
      case 'price':
        setPriceDirty(true)
      break
      case 'number':
        setNumberDirty(true)
      break
      case 'file':
        setFileDirty(true)
        break
    }
  }

  //validation forms
  const inputHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value)
        if (String(e.target.value).length > 1) {
          setNameError('')
        } else {
          setNameError('Некорректное имя')
        }
        if (String(e.target.value).length === 0) setNameError(`Поле "${e.target.name}" не может быть пустым`)
      break
      case 'price':
        setPrice(e.target.value)
        const rp = /\d*(\.\d\d)?/
        if (!rp.test(String(e.target.value)) && String(e.target.value).length !== 0) {
          setPriceError('Некорректная цена')
        } else {
          setPriceError('')
        }
        if (String(e.target.value).length === 0 || e.target.value <= 0) setPriceError(`Цена не может быть ниже или равна 0`)
      break
      case 'number':
        setNumber(e.target.value)
        const rn = /^\d+$/
        if (!rn.test(String(e.target.value)) && String(e.target.value).length !== 0) {
          setNumberError('Некорректное количество')
        } else {
          setNumberError('')
        }
        if (String(e.target.value).length === 0 || e.target.value <= 0) setNumberError(`Количество не может быть ниже 1 или не целое`)
      break
      case 'file':
        setFile(e.target.files[0])
        if (String(e.target.files[0].type) === 'image/jpeg') {
          setFileError('')
        } else {
          setFileError('Некорректный тип файла')
        }
        break
    }
  }

  //server error validation function
  const serverValidationHandler = (e) => {
    switch (e.path) {
      case 'name':
        setNameError(e.msg)
        break
      case 'price':
        setPriceError(e.msg)
        break
      case 'number':
        setNumberError(e.msg)
        break
      case 'typeId':
        setTypeError(e.msg)
        break
      case 'brandId':
        setBrandError(e.msg)
        break
    }
  }
  
  //get types and brands
  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])

  //add informations
  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  //remove informations
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  //set info field
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number===number?{...i,[key]:value} : i))
  }

  //add device function
  const addDevice = () => {
    const formData = new FormData ()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('number', `${number}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data=>onHide()).catch(e => {
      if(e.response.data.message) setMessage(e.response.data.message)
      if (e.response.data.errors) {
        e.response.data.errors.map(error => {
        serverValidationHandler(error)
        })
        setErrorMessage(e)
      }
    })
  }

  //set type for device
  const setType = (type) => {
    device.setSelectedType(type);
    setTypeError('')
    setTypeDanger(true)//set danger color for input type
    setTimeout(() => {
      setTypeDanger(false)
    }, 1000);
  }

  //set brand for device
  const setBrand = (brand) => {
    device.setSelectedBrand(brand)
    setBrandError('')
    setBrandDanger(true)//set danger color for input brand
    setTimeout(() => {
      setBrandDanger(false)
    }, 1000);
  }

  //do not show
  if (!show) {
    return null
  }

  //show
  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>Добавить устройство</div>
      <div className={styles.modal__body}>
        <div className={styles.form__error}>
          {typeError && <div>{typeError}</div>}
        </div>
        <MyMenu name={'Выберите тип'} menu={device.types} click={setType} danger={typeDanger}/>
        <div className={styles.form__error}>
          {brandError && <div>{brandError}</div>}
        </div>
        <MyMenu name={'Выберите бренд'} menu={device.brands} click={setBrand} danger={brandDanger}/>
        <div className={styles.form__error}>
          {(nameDirty && nameError) ? <div>{nameError}</div> : <div className={styles.form__hint}>Имя должно быть не менее 2 символов</div>}
        </div>
        <MyInput name='name' type='text' value={name} onBlur={e => blurHandler(e)} onChange={e=>inputHandler(e)} placeholder="Введите название товара" />
        <div className={styles.form__error}>
          {(priceDirty && priceError) ? <div>{priceError}</div> : <div className={styles.form__hint}>Цена должна быть больше 0</div>}
        </div>
        <MyInput name='price' type='number' step='0.01' min='0' value={price} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} placeholder="Введите цену товара" />
        <div className={styles.form__error}>
          {(numberDirty && numberError) ? <div>{numberError}</div> : <div className={styles.form__hint}>Количество должно быть больше 0</div>}
        </div>
        <MyInput name='number' type='number' min='0' value={number} onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} placeholder="Введите количество товара" />
        <div className={styles.form__error}>
          {(fileDirty && fileError) ? <div>{fileError}</div> : <div className={styles.form__hint}>Тип файла: ".jpeg, .jpg"</div>}
        </div>
        <MyInput name='file' type='file' onBlur={e => blurHandler(e)} onChange={e => inputHandler(e)} accept='image/jpeg'/>
        {message.length !==0 && <div className={styles.message}>{message}<MyButton name={"OK"} danger={true} onClick={()=>setMessage('')}/></div>}
        
        {info.map(i => 
        <div className={styles.info} key={i.number}>
          <div className={styles.info__title}>
            <MyInput type='text' value={i.title} onChange={(e)=>changeInfo('title', e.target.value, i.number)} placeholder="Введите название свойства"/>
          </div>
          <div className={styles.info__description}>
            <MyInput type='text' value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)} placeholder="Введите описание свойства" />
          </div>
          <div className={styles.info__remove}>
            <MyButton name={"Удалить"} danger={true} onClick={()=>removeInfo(i.number)} />
          </div>
         </div>  
        )}
        <MyButton name={'Добавить новое свойство'} danger={true} onClick={addInfo} />
      </div>
      <div className={styles.modal__futor}>
        <MyButton name={'Закрыть'} danger={true} onClick={onHide}></MyButton>
        <MyButton name={'Добавить'} onClick={addDevice} disabled={disabled}></MyButton>
      </div>
    </div> 
  );
});
export default CreateDevice;