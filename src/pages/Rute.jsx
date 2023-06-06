import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/layouts/Breadcrumb'
import Navbar from '../components/layouts/Navbar'
import RuteTable from '../components/layouts/RuteTable'
import Verifikasi from "../components/layouts/Verifikasi";

const Rute = () => {
  return (
    <div>
      <Navbar/>
      <Verifikasi />
      <RuteTable/>
    </div>
  )
}

export default Rute