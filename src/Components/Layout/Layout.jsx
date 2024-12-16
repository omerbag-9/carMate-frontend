import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import LoadingSpinner from '../Loading/LoadingSpinner'

export default function Layout() {
    return (
        <>
            <div className="xl:container">
                <Navbar />
                
                <Outlet />

                <Footer />
            </div>
        </>
    )
}
