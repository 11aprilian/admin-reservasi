import React from 'react'
import Breadcrumb from '../components/layouts/Breadcrumb'
import Navbar from '../components/layouts/Navbar'
import TransaksiTable from '../components/layouts/TransaksiTable'

const Transaksi = () => {
  return (
    <div>
        <Navbar/>
        <TransaksiTable/>
    </div>
  )
}

export default Transaksi