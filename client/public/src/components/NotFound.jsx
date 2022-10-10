import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>Nobody to talk here. Go to <Link to='/login' >log yourself.</Link> </h3>
    </div>
  )
}

export default NotFound
