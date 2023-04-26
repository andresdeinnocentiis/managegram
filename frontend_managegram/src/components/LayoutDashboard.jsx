import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

function LayoutDashboard() {
  return (
    <div>
        <Outlet />
        
    </div>
  )
}

export default LayoutDashboard