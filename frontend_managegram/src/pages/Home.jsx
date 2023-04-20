import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../redux/actions/themeActions'

function Home() {

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
        <>
            <h1 onClick={() => handleChangeTheme()}>Home - { theme } theme</h1>
            <ul>
                <li>
                    Username: 
                </li>
            </ul>
        </>
    )
}

export default Home