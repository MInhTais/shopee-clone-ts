import { Navigate, Outlet, useRoutes } from 'react-router-dom'
// import ProductList from './Pages/ProductList'
// import Login from './Pages/Login'
// import Regiter from './Pages/Register'
import RegisterLayout from './Layout/RegisterLayout'
import MainLayout from './Layout/MainLayout'
import { useContext, lazy, Suspense } from 'react'
import { AppContext } from './context/app.context'
import path from './constants/path'
// import ProductDetail from './Pages/ProductDetail'
// import Cart from './Pages/Cart'
import CartLayout from './Layout/CartLayout'
import UserLayout from './Pages/User/layouts/UserLayout'
// import ChanePassworld from './Pages/User/pages/ChanePassworld'
// import HistoryPurchase from './Pages/User/pages/HistoryPurchase'
// import Profile from './Pages/User/pages/profile'
// import PageNotFound from './Pages/NotFound'

const Login = lazy(() => import('./Pages/Login'))
const Cart = lazy(() => import('./Pages/Cart'))
const Regiter = lazy(() => import('./Pages/Register'))
const ProductDetail = lazy(() => import('./Pages/ProductDetail'))
const ChanePassworld = lazy(() => import('./Pages/User/pages/ChanePassworld'))
const HistoryPurchase = lazy(() => import('./Pages/User/pages/HistoryPurchase'))
const Profile = lazy(() => import('./Pages/User/pages/profile'))
const ProductList = lazy(() => import('./Pages/ProductList'))
const PageNotFound = lazy(() => import('./Pages/NotFound'))
// nếu khai báo component trong hook mỗi lần hook render là nó tạo component mới
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}
export default function useRouteElement() {
  const routeElements = useRoutes([
    // {
    //   path: '',
    //   element: <ProtectedRoute />,
    //   children: [
    //     {
    //       path: path.profile,
    //       element: (
    //         <MainLayout>
    //           <Profile />
    //         </MainLayout>
    //       )
    //     }
    //   ]
    // },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                {' '}
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          // children: [
          //   {
          //     path: '',
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChanePassworld />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
            //   ]
            // }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                {' '}
                <Regiter />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            {' '}
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/:nameId',
      element: (
        <MainLayout>
          <Suspense>
            {' '}
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <PageNotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
