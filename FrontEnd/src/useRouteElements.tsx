import ProductList from './pages/ProductList'
import Login from './pages/Login'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import Register from './pages/Register'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'

import { useContext } from 'react'
import path from 'src/constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import ProductCategory from './pages/ProductList/ProductCategory'
import UserLayout from './layouts/UserLayout'
import Profile from './pages/User/Profile'
import ChangePassword from './pages/User/ChangePassword'
import LayoutAdmin from './pages/Admin/layouts/LayoutAdmin'
import Dashboard from './pages/Admin/pages/Dashboard'
import Accounts from './pages/Admin/pages/Accounts'
import Products from './pages/Admin/pages/Products'
import Orders from './pages/Admin/pages/Orders'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import FormInput from './pages/User/FormInput'
import HistoryPurchase from './pages/User/HistoryPurchase/HistoryPuchase'
import Forgetpassword from './pages/Forgetpassword'
import DeteledProducts from './pages/Admin/pages/DeteledProducts'
import Brands from './pages/Admin/pages/Brands'
import FilterBrand from './pages/FilterBrand'

// import FormAccountEdit from './pages/Admin/component/FormAccountEdit'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function AdminProtectedRoute() {
  const { isAuthenticated, user } = useContext(AppContext)
  // console.log(user)
  return isAuthenticated && user && user.roles.includes('Admin') ? <Outlet /> : <Navigate to='/login' />
}

export default function UseRouterElement() {
  const routerElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: path.forgetpassword,
          element: (
            <RegisterLayout>
              <Forgetpassword />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              {' '}
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            },
            {
              path: path.formInput,
              element: <FormInput />
            }
          ]
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.productCategory,
      element: (
        <MainLayout>
          <ProductCategory />
        </MainLayout>
      )
    },
    {
      path: path.productBrand,
      element: (
        <MainLayout>
      <FilterBrand/>
        </MainLayout>
      )
    },
    {
      path: path.cart,
      element: (
        <MainLayout>
          <Cart />
        </MainLayout>
      )
    },
    {
      path: path.payment,
      element: <MainLayout>{/* <Payment /> */}</MainLayout>
    },
    {
      path: '',
      element: <AdminProtectedRoute />,
      children: [
        {
          path: path.admin,
          element: (
            <AdminLayout>
              <LayoutAdmin />
            </AdminLayout>
          ),
          children: [
            {
              path: path.dashboard,
              element: <Dashboard />
            },
            {
              path: path.accounts,
              element: <Accounts />
            },
            {
              path: path.products,
              element: <Products />
            },
            {
              path: path.deteledProducts,
              element: <DeteledProducts />
            },
            {
              path: path.brands,
              element: <Brands />
            },
            {
              path: path.orders,
              element: <Orders />
            }
          ]
        }
      ]
    }

    // {
    //   path: '',
    //   element: <AdminProtectedRoute />,
    //   children: [
    //     {
    //       path: path.admin,
    //       element: (
    //         // <AdminLayout>
    //         //   <LayoutAdmin />
    //         // </AdminLayout>
    //       ),
    //       children: [
    //         // {
    //         //   path: path.dashboard,
    //         //   element: (
    //         //     // <Dashboard />
    //         //   )
    //         // },
    //         // {
    //         //   path: path.formAccountEdit,
    //         //   element: <FormAccountEdit />
    //         // },
    //         {
    //           path: path.accounts,
    //           // element: <Accounts />
    //         },
    //         {
    //           path: path.products,
    //           // element: <Products />
    //         },
    //         {
    //           path: path.orders,
    //           // element: <Orders />
    //         }
    //       ]
    //     }
    //   ]
    // }
  ])
  return routerElement
}
