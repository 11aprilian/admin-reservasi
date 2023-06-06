import React from 'react'
import Navbar from '../components/layouts/Navbar'
import DriverTable from '../components/layouts/DriverTable'
import Verifikasi from "../components/layouts/Verifikasi";

const Driver = () => {
  return (
    <div>
        <Navbar/>
        <Verifikasi />
        <DriverTable/>
    </div>
  )
}

export default Driver