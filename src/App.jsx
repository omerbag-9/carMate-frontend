import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import AboutUs from './Components/AboutUs/AboutUs'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'


let routers = createHashRouter([
  {
    path: "", element:<Layout />,children: [
      {index: true, element: <Home />},
      {path: "about", element: <AboutUs />},
      {path: "register", element: <Register />},
      {path: "login", element: <Login />},
      {path: "*", element: <NotFound />},
    ]
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  )
}

export default App
