import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { DashboardNavbar } from './DashboardNavbar'

function LayoutDashboard() {
  return (
    <div className='dashboard-layout-container'>
        <div className="dashboard-layout">
          <DashboardNavbar />
          <Sidebar />
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default LayoutDashboard