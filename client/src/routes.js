import Admin from "./pages/Admin"
import About from "./pages/About"
import Order from "./pages/Order"
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import { ADMIN_ROUTE, ABOUT_ROUTE, BASKET_ROUTE, SHOP_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, DEVICE_ROUTE, ORDER_ROUTE, PROFILE_ROUTE, HOME_ROUTE } from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
    breadcrumb: 'admin panel'
  },
  {
    path: ORDER_ROUTE,
    Component: Order,
    breadcrumb: 'orders'
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
    breadcrumb: 'profile'
  }
]

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
    breadcrumb: 'device'
  },
  {
    path: HOME_ROUTE,
    Component: Home,
    breadcrumb: 'home'
  },
  {
    path: ABOUT_ROUTE,
    Component: About,
    breadcrumb: 'about'
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
    breadcrumb: 'auth / login'
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
    breadcrumb: 'auth / registration'
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: DevicePage,
    breadcrumb: ''
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
    breadcrumb: 'basket'
  }
]