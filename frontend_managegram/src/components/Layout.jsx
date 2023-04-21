import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

function Layout() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <h1>Layout - Footer</h1>
    </div>
  )
}

export default Layout