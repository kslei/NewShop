import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {observer} from 'mobx-react-lite';
import Futor from "./components/Futor";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Errors from "./components/Errors";
import { Context } from ".";
import { check } from "./http/userAPI";
import Loader from "./components/Loader";
import Breadcrumbs from "./components/Breadcrumbs";

const App = observer(() => {
  const {user} = useContext(Context);
  const {device} = useContext(Context)
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  
  //authorization check
  useEffect(()=>{
    check().then(data => {
      if(data.id) {
        user.setUser(true)
        user.setIsAuth(true)
        user.setRole(data.role)
        user.setId(data.id)
        user.setName(data.name)
        user.setEmail(data.email)
      }
    }).catch(e => {console.log(e.response.data.message)})
    .finally(()=>setLoading(false))
  },[])
  
  //reset settings when going to the home page
  function clickType (data) {
    device.setSelectedType(data)
    device.setSelectedBrand(data)
    device.setPage(1)
    setSearch('')
  }

  //page loading widget
  if(loading) {
    return <Loader/>
  }
  
  //error page
  if(errorMessage) {
    return <Errors e={errorMessage} seterrormessage={setErrorMessage}/>
  }

  return (
    <BrowserRouter>
      <Header search={search} onSearch={setSearch} onclick={clickType}/>
      <NavBar onclick={clickType} onSearch={setSearch}/>
      <Breadcrumbs onSearch={setSearch}/>
      <AppRouter searchQuery={search} seterrormessage={setErrorMessage}/>
      <Futor />
    </BrowserRouter>
  )
})

export default App;
