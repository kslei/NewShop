import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceSore from './store/DeviceStore';
import OrderStore from './store/OrderStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Context.Provider value={{
  user: new UserStore(),
  device: new DeviceSore(),
  order: new OrderStore(),
}}>
  <App />
</Context.Provider>
);
