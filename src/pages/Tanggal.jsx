import React from 'react'
import Navbar from '../components/layouts/Navbar'
import TanggalTable from '../components/layouts/TanggalTable'
import Verifikasi from "../components/layouts/Verifikasi";

const Tanggal = () => {
  return (
    <div>
        <Navbar/>
        <Verifikasi />
        <TanggalTable/>
    </div>
  )
}

export default Tanggal