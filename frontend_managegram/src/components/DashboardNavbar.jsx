import React, { useState } from 'react'
import TogglerOpen from './Toggler'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../redux/actions/themeActions'
import { openSidebar } from '../redux/actions/sidebarActions'

export const DashboardNavbar = () => {

    const { theme } = useSelector((state) => state.theme)
    const { sidebarOpen } = useSelector((state) => state.sidebarOpen)
    
    const dispatch = useDispatch()

    const handleToggle = () => {
        if (sidebarOpen) {
            dispatch(openSidebar(""))
        } else {
            dispatch(openSidebar("sidebar-open"))
        }
    }

    const handleChangeTheme = () => {
        if (theme == 'light') {
            dispatch(changeTheme('dark'))
        } else {
            dispatch(changeTheme('light'))
        }
    }

    return (
        <nav className='dashboard-nav'>
            <div className="dashboard-nav__ul">

                <i className="fa-solid fa-bars burger" onClick={handleToggle}></i>

                <div className="rest-dashboard-nav">
                    <div className="togglerIconContainer dashboardThemeIconContainer" onClick={handleChangeTheme}>
                        {
                            theme == 'dark' ?
                            <i className="fa-solid fa-sun togglerIcon dashboardThemeIcon"></i> :
                            <i className="fa-solid fa-moon togglerIcon dashboardThemeIcon"></i>
                        }
                    </div>
                    

                </div>

            </div>
        </nav>
    )
}
