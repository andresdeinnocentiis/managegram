import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export const Dashboard = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { error, loading, userInfo } = userLogin

  useEffect(() => {

  }, [userInfo])

  if(!userInfo) {
    return(
      <Navigate to={'/login'}  />
    )
  } else {
    
    return (
      <div>
        <h1>This will be the user's Dashboard</h1>
      </div>
    )
  }
}
