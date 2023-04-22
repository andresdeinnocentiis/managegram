import styled from 'styled-components'

const TogglerOpen = (props) => {

    return (
        <div onClick={props.onClick} className={`nav__toggler icon nav-icon-5 ${props.toggleIcon}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default TogglerOpen
