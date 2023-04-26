import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'

function LayoutDashboard() {
  return (
    <div>
        <Outlet />
        <Footer />
    </div>
  )
}

export default LayoutDashboard