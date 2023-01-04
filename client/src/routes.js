import Admin from "./pages/Admin"
import About from "./pages/About"
import Order from "./pages/Order"
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import { ADMIN_ROUTE, ABOUT_ROUTE, BASKET_ROUTE, SHOP_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, DEVICE_ROUTE, ORDER_ROUTE, PROFILE_ROUTE } from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: ORDER_ROUTE,
    Component: Order
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile
  }
]

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: ABOUT_ROUTE,
    Component: About
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: DevicePage
  }
]