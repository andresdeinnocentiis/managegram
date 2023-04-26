import React from 'react'
import { NavLink } from 'react-router-dom'
import managegramLogo from '../assets/images/favicon2.png'

export const Footer = () => {
  return (
    <footer className='footer'>
        <div className="footer-container">
            <NavLink className="footer-logo-container" to={'/'}>
                <img className='footer-logo' src={managegramLogo} alt="Managegram Logo" />
            </NavLink>
            <div className="brand-info-container">
                
                    <div className="footer-brand-container">
                        <h1 className='footer-brand'>Managegram.</h1>
                    </div>
                    <div className="footer-columns-container">
                        <div className="footer-column">
                            <h4>SECTIONS</h4>
                            <NavLink className="footer-link" to={'/'}>Home</NavLink>
                            <NavLink className="footer-link" to={'/about'}>About</NavLink>
                            <NavLink className="footer-link" to={'/dashboard'}>Dashboard</NavLink>
                        </div>
                        <div className="footer-column">
                            <h4>CONTACT</h4>
                            <NavLink className="footer-link" to={'/contact'}>Contact</NavLink>
                            <a href="https://www.andresdeinnocentiis.com" target="_blank">Developer's website</a>
                            <a href="https://www.linkedin.com/in/andresdeinnocentiis-pythondeveloper-webdeveloper/" target="_blank">LinkedIn</a>
                        </div>
                    </div>
                
            </div>
            <div className="copyrights">Developed by <a href="https://www.andresdeinnocentiis.com" target="_blank">@andresdeinnocentiis</a> | <span className='copyright-symbol'>&reg;</span> 2023 Andres De Innocentiis</div>
        </div>
    </footer>
  )
}
