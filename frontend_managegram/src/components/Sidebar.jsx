import React, {useState} from 'react'
import logo from '../assets/images/favicon2.png'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openSidebar } from '../redux/actions/sidebarActions'

export const Sidebar = (props) => {

    const dispatch = useDispatch()

    const { sidebarOpen } = useSelector((state) => state.sidebarOpen)
 
    const handleOpenSidebar = () => {
        dispatch(openSidebar("sidebar-open"))
    }
 
    const handleCloseSidebar = () => {
        dispatch(openSidebar(""))
    }

    const sidebarItems = [
        {id:1, name:"Dashboard",icon:"fa-solid fa-chart-simple",route:"/dashboard/"},
        {id:2, name:"Analytics",icon:"fa-solid fa-chart-line",route:"/dashboard/analytics"},
        {id:3, name:"Products",icon:"fa-solid fa-box-open",route:"/dashboard/products"},
        {id:4, name:"Suppliers",icon:"fa-solid fa-boxes-packing",route:"/dashboard/suppliers"},
        {id:5, name:"Clients",icon:"fa-solid fa-users",route:"/dashboard/clients"},
        {id:6, name:"Orders",icon:"fa-solid fa-file-invoice",route:"/dashboard/orders"},
        {id:7, name:"Payments",icon:"fa-solid fa-money-check-dollar",route:"/dashboard/payments"},
        {id:8, name:"Discounts",icon:"fa-solid fa-percent",route:"/dashboard/discounts"},
        {id:9, name:"Brands",icon:"fa-regular fa-copyright",route:"/dashboard/brands"},
        {id:10, name:"Categories",icon:"fa-solid fa-list",route:"/dashboard/categories"},
        {id:11, name:"Shipping Addresses",icon:"fa-solid fa-map-location-dot",route:"/dashboard/shipping-addresses"},
    ]

    return (       
            <nav className={`sidebar ${sidebarOpen}`}
                onMouseEnter={handleOpenSidebar}
                onMouseLeave={handleCloseSidebar}
            >
                <header className='sidebar-header'>
                    <div className="image-text">
                        <div className="sidebar-image-container">
                            <NavLink to={'/'} className="sidebar-image-link">
                                <img src={logo} alt="logo" className="sidebar-image" />
                            </NavLink>
                        </div>
                        {sidebarOpen && <div className="text header-text">
                            <span className="name">Managegram.</span>
                        </div>}
                    </div>
                    {
                        sidebarOpen ? 
                        <i className="fa-solid fa-chevron-left sidebar-chevron" onClick={handleCloseSidebar}></i> 
                            :
                        <i className="fa-solid fa-chevron-right sidebar-chevron" onClick={handleOpenSidebar}></i>
                    }
                </header>
                <div className={`menu-bar ${sidebarOpen}-menu`}>
                    <div className="menu">
                        <ul className="menu-links">
                            {sidebarItems.map((item) => {return (
                                <li key={item.id} className="sidebar-link">
                                    <NavLink className='sidebar-link__a' to={item.route}>
                                    <div className="sidebar-link-wrapper">
                                        <div className="icon-text-container">
                                            <i className={`${item.icon} item-icon`}></i>
                                            {sidebarOpen && <p className="route-name">{item.name}</p>}
                                        </div>
                                    </div>
                                    </NavLink>
                                </li>
                            )})}
                        </ul>
                    </div>
                </div>
            </nav>
    )

}
