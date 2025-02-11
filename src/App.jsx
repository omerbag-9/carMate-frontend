import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import AboutUs from './Components/AboutUs/AboutUs'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import Marketplace from './Components/MarketPlace/Marketplace'
import Moredetails from './Components/Moredetails/Moredetails'
import { useTranslation } from 'react-i18next'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Community from './Components/Community/Community'


let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "register", element: <Register /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "login", element: <Login /> },
      {path: "marketplace", element: <Marketplace/>},
      {path: "moredetails", element: <Moredetails/>},
      {path: "community", element: <Community/>},
    ]
  },
  // Separate route for NotFound page
  {
    path: "*",
    element: <NotFound />
  }
])
function App() {
  const [count, setCount] = useState(0)
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  )
}

export default App
