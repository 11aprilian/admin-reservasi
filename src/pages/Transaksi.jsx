import React from 'react'
import Breadcrumb from '../components/layouts/Breadcrumb'
import Navbar from '../components/layouts/Navbar'
import TransaksiTable from '../components/layouts/TransaksiTable'
import Verifikasi from "../components/layouts/Verifikasi";

const Transaksi = () => {
  return (
    <div>
        <Navbar/>
        <Verifikasi />
        <TransaksiTable/>
    </div>
  )
}

export default Transaksi