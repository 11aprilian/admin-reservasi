import React from 'react'
import Breadcrumb from '../components/layouts/Breadcrumb'
import Navbar from '../components/layouts/Navbar'
import UserTable from '../components/layouts/UserTable'
import Verifikasi from "../components/layouts/Verifikasi";

const User = () => {
  return (
    <div>
        <Navbar/>
        <Verifikasi />
        <UserTable/>
    </div>
  )
}

export default User