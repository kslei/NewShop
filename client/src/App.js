import React from "react";
import { BrowserRouter } from "react-router-dom";
import {observer} from 'mobx-react-lite';
import Futor from "./components/Futor";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

const App = observer(() => {

  
  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <AppRouter />
      <Futor />
    </BrowserRouter>
  )
})

export default App;
