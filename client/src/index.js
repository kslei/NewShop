import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceSore from './store/DeviceStore';
import OrderStore from './store/OrderStore';
import NewStore from './store/NewStore';
import DiscountStore from './store/DicountStore';
import './i18n';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Context.Provider value={{
  user: new UserStore(),
  device: new DeviceSore(),
  order: new OrderStore(),
  newdevice: new NewStore(),
  discountdevice: new DiscountStore(),
}}>
  <App />
</Context.Provider>
);
