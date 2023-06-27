import React, { useContext } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { HOME_ROUTE } from '../utils/consts';

const AppRouter = observer(({searchQuery, seterrormessage}) => {
  const {user} = useContext(Context);
  
  return (
  <Routes>
    {user.isAuth && authRoutes.map(({ path, Component }) =>
      <Route key={path} path={path} element={<Component searchQuery={searchQuery} setErrorMessage={seterrormessage} />} exact />
    )}
    {publicRoutes.map(({ path, Component }) => 
      <Route key={path} path={path} element={<Component searchQuery={searchQuery} setErrorMessage={seterrormessage} />} exact />
    )}
      <Route path='*' element={<Navigate to={HOME_ROUTE}/>} />
  </Routes>
  );
});
export default AppRouter;