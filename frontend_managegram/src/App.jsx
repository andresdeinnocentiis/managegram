import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './components/Layout'
import Home from './pages/Home'


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
          element: <h1>Login</h1>
        },
        {
          path: '/profile',
          element: <h1>Profile</h1>
        },
        {
          path: '/analytics',
          element: <h1>Analytics</h1>
        },
        {
          path: '/orders',
          element: <h1>Orders</h1>
        },
        {
          path: '/suppliers',
          element: <h1>Suppliers</h1>
        },
        {
          path: '/clients',
          element: <h1>Clients</h1>
        },
        {
          path: '/payments',
          element: <h1>Payments</h1>
        },
        {
          path: '/products',
          element: <h1>Products</h1>
        },
        {
          path: '/brands',
          element: <h1>Brands</h1>
        },
        {
          path: '/categories',
          element: <h1>Categories</h1>
        },
        {
          path: '/discounts',
          element: <h1>Discounts</h1>
        },
      ]
    },
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
