import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import AboutUs from './Components/AboutUs/AboutUs'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import Moredetails from './Components/Moredetails/Moredetails'
import { useTranslation } from 'react-i18next'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Community from './Components/Community/Community'
import Notification from './Components/Notification/Notification'
import Marketplace from './Components/Marketplace/Marketplace'
import ContactUs from './Components/ContactUs/ContactUs'
import "react-toastify/dist/ReactToastify.css";
import OwnPosts from './Components/OwnPosts/OwnPosts'

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

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
      {path: "moredetails/:id", element: <Moredetails/>},
      {path: "community", element: <Community/>},
      {path: "notification", element: <Notification/>},
      {path: "Contact", element: <ContactUs />},
      {path: "ownposts", element: <OwnPosts />},
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
    // Set direction based on language
    document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
    // Force dark mode by adding the dark class to html element
    document.documentElement.classList.add('dark');
    // Add overflow-x-hidden to body to prevent horizontal scrolling
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    // Apply force-dark utility class to body
    document.body.classList.add('force-dark');
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full overflow-x-hidden dark:bg-darkBg dark:text-darkText force-dark">
        <RouterProvider router={routers}></RouterProvider>
      </div>
      

    </QueryClientProvider>
  )
}

export default App