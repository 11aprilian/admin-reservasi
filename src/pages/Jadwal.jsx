import React from 'react'
import Breadcrumb from '../components/layouts/Breadcrumb'
import JadwalTable from '../components/layouts/JadwalTable'
import Navbar from '../components/layouts/Navbar'

const Jadwal = () => {
  return (
    <div>
        <Navbar/>
        <Breadcrumb/>
        <JadwalTable/>
    </div>
  )
}

export default Jadwal