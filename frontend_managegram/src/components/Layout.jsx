import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <h1>Layout - Navbar</h1>
        <Outlet />
        <h1>Layout - Footer</h1>
    </div>
  )
}

export default Layout