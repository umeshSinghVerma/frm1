import React from 'react'
import {useLocation} from "react-router-dom"
const Flight = () => {
  const location=useLocation()
  console.log(location)
  return (
    <div>Flight</div>
  )
}

export default Flight