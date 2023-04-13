import React from 'react'
import Breadcrumb from '../components/layouts/Breadcrumb'
import Navbar from '../components/layouts/Navbar'
import UserTable from '../components/layouts/UserTable'

const User = () => {
  return (
    <div>
        <Navbar/>
        <Breadcrumb/>
        <UserTable/>
    </div>
  )
}

export default User