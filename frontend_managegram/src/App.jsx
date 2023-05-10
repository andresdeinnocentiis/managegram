import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './components/Layout'
import LayoutDashboard from './components/LayoutDashboard'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Products } from './pages/Products'


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: Home()
        },
        {
          path: '/about',
          element: <h1>About</h1>
        },
        {
          path: '/contact',
          element: <h1>Contact</h1>
        },
        {
          path: '/login',
          element: Login()
        },
        {
          path: '/sign_up',
          element: <h1>Sign Up</h1>
        },
        {
          path: '/profile',
          element: <h1>Profile</h1>
        },
        
      ],
      
    }, {
      path: '/dashboard/',
        element: <LayoutDashboard />,
        children: [
          {
            path: '/dashboard/',
            element: Dashboard()
          },
          {
            path: '/dashboard/analytics',
            element: <h1>Analytics</h1>
          },
          {
            path: '/dashboard/orders',
            element: <h1>Orders</h1>
          },
          {
            path: '/dashboard/suppliers',
            element: <h1>Suppliers</h1>
          },
          {
            path: '/dashboard/clients',
            element: <h1>Clients</h1>
          },
          {
            path: '/dashboard/payments',
            element: <h1>Payments</h1>
          },
          {
            path: '/dashboard/products',
            element: Products()
          },
          {
            path: '/dashboard/brands',
            element: <h1>Brands</h1>
          },
          {
            path: '/dashboard/categories',
            element: <h1>Categories</h1>
          },
          {
            path: '/dashboard/discounts',
            element: <h1>Discounts</h1>
          },
          {
            path: '/dashboard/update-prices',
            element: <h1>Update Prices</h1>
          },
          {
            path: '/dashboard/shipping-addresses',
            element: <h1>Shipping Addresses</h1>
          },
        ]
    }
  ])

  // TESTEANDO REDUX:
  const { theme } = useSelector((state) => state.theme)

  const element = document.getElementsByTagName('body')[0]

  if (theme == 'light') {
    element.classList.remove('body-dark')  
    element.classList.add(`body-${theme}`)
  } else if (theme == 'dark') {
    element.classList.remove('body-light')
    element.classList.add(`body-${theme}`)
  }
  // FIN TESTEO REDUX

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
