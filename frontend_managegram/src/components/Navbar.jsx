import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../redux/actions/themeActions'
import { NavLink } from 'react-router-dom'
import managegramLogo from '../assets/images/favicon2.png'
import TogglerOpen from './Toggler'

const navItems = [
    {
        id: 1,
        name: "Home",
        route: '/'
    },
    {
        id: 2,
        name: "About",
        route: '/about'
    },
    {
        id: 3,
        name: "Contact",
        route: '/contact'
    },
    {
        id: 4,
        name: "Login",
        route: '/login'
    },
]



export const Navbar = () => {
    
    const [navbarOpen, setNavbarOpen] = useState("")
    const [toggleIcon, setTogglerIcon] = useState("")
    
    
    const handleToggle = () => {
        navbarOpen ? setNavbarOpen("") : setNavbarOpen("nav__active")
        navbarOpen ? setTogglerIcon("") : setTogglerIcon("open")
    }

    const handleClickLink = () => {
        setNavbarOpen("")
        setTogglerIcon("")
    }

    const { theme } = useSelector((state) => state.theme)
    
    const dispatch = useDispatch()

    const handleChangeTheme = () => {
        if (theme == 'light') {
            dispatch(changeTheme('dark'))
        } else {
            dispatch(changeTheme('light'))
        }
    }

    return (
    <nav className='layout-navbar'>
        <NavLink className="logo-container" to={'/'}>
            <img className='logo' src={managegramLogo} alt="Managegram Logo" />
        </NavLink>
        <ul className={`nav-items-container ${navbarOpen}`}>
            <div className="togglerIconContainer" onClick={handleChangeTheme}>
                {
                    theme == 'dark' ?
                    <i className="fa-solid fa-sun togglerIcon"></i> :
                    <i className="fa-solid fa-moon togglerIcon"></i>
                }
            </div>
            {navItems.map((item) => {
                return(
                    <li onClick={handleClickLink} key={item.id} className={item.name == 'Login' ? "nav-li login-li" : 'nav-li'}>
                        <NavLink className='nav-link' to={item.route}>{item.name}</NavLink>
                    </li>
                )
            })}
        </ul>
        <div className="burger">
            <TogglerOpen onClick={handleToggle} toggleIcon={toggleIcon} />
        </div>
    </nav>
  )
}



