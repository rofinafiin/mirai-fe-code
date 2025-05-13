import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = Cookies.get('login')
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  try {
    const decoded = jwtDecode(token)
    const userRole = decoded.roleid
    
    if (requiredRole && userRole !== 1) {
      return <Navigate to="/" replace />
    }
  } catch (error) {
    console.error('Error decoding token:', error)
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute
