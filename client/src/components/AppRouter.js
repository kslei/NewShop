import React, { useContext } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = observer(({searchQuery}) => {
  const {user} = useContext(Context);
  
  return (
  <Routes>
    {user.isAuth && authRoutes.map(({ path, Component }) =>
      <Route key={path} path={path} element={<Component searchQuery={searchQuery} />} exact />
    )}
    {publicRoutes.map(({ path, Component }) => 
      <Route key={path} path={path} element={<Component searchQuery={searchQuery} />} exact />
    )}
      <Route path='*' element={<Navigate to={SHOP_ROUTE}/>} />
  </Routes>
  );
});
export default AppRouter;