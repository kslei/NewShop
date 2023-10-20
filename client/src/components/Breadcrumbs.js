import React, { useState, useEffect } from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { fetchOneDevice } from '../http/deviceAPI';
import { authRoutes, publicRoutes } from '../routes';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/Breadcrumbs.module.scss';

const Breadcrumbs = ({ onSearch }) => {
  const [device, setDevice] = useState('');
  const routes = authRoutes.concat(publicRoutes);
  const breadcrumbs = useBreadcrumbs(routes);
  const location = useLocation()
  const loc = location.pathname.split('/')
  const {i18n} = useTranslation()
    
  useEffect(() => {
    if (Number(loc[loc.length-1])) {
      fetchOneDevice(Number(loc[loc.length - 1])).then(data => {
      setDevice(data);
    })}
  }, [location, i18n.language])

  return (
  <div className={styles.breadcrumb}>
    <div className={styles.wrapper}>
      {breadcrumbs.map(item => 
        <Link
          key={item.match.pathname}
          to={item.match.pathname}
          className={item.match.pathname === location.pathname ? styles.breadcrumb_active : styles.breadcrumb_not_active}
          onClick={()=>onSearch('')}
        > / {item.match.params.id ? device.name : item.breadcrumb} </Link>
      )}
    </div>
      
  </div>
  );
};
export default Breadcrumbs;