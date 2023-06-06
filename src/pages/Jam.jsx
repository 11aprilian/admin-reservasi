import React from 'react'
import Breadcrumb from '../components/layouts/Breadcrumb'
import JamTable from '../components/layouts/JamTable'
import Navbar from '../components/layouts/Navbar'
import Verifikasi from "../components/layouts/Verifikasi";

const Jam = () => {
  return (
    <div>
        <Navbar/>
        <Verifikasi />
        <JamTable/>
    </div>
  )
}

export default Jam