import React from 'react'
import Navbar from '../components/layouts/Navbar'
import Verifikasi from '../components/layouts/Verifikasi'
import ArmadaTable from '../components/layouts/ArmadaTable'

const Armada = () => {
  return (
    <div>
        <Navbar/>
        <Verifikasi/>
        <ArmadaTable/>
    </div>
  )
}

export default Armada