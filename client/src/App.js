import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {observer} from 'mobx-react-lite';
import Futor from "./components/Futor";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Context } from ".";
import { check } from "./http/userAPI";
import Loader from "./components/Loader";

const App = observer(() => {
  const {user} = useContext(Context);
  const {device} = useContext(Context)
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  useEffect(()=>{
    check().then(data => {
      if(data) {
        user.setUser(true)
        user.setIsAuth(true)
        user.setRole(data.role)
        user.setId(data.id)
      }
    }).finally(()=>setLoading(false))
  },[])
  
  function clickType (data) {
    device.setSelectedType(data)
    device.setSelectedBrand(data)
    device.setPage(1)
  }

  if(loading) {
    return <Loader/>
  }

  return (
    <BrowserRouter>
      <Header search={search} onSearch={setSearch} onclick={clickType} />
      <NavBar onclick={clickType} />
      <AppRouter searchQuery={search} />
      <Futor />
    </BrowserRouter>
  )
})

export default App;
