import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Transaksi from "./pages/Transaksi";
import Rute from "./pages/Rute";
import Login from "./pages/Login";
import RegisterAdmin from "./pages/RegisterAdmin";
import Jam from "./pages/Jam";
import User from "./pages/User";
import TransaksiDetail from "./pages/TransaksiDetail";
import RuteAdd from "./pages/RuteAdd";
import RuteUpdate from "./pages/RuteUpdate";
import JamAdd from "./pages/JamAdd";
import JamUpdate from "./pages/JamUpdate";
import Hari from "./pages/Hari";
import HariAdd from "./pages/HariAdd";
import HariUpdate from "./pages/HariUpdate";
import Jadwal from "./pages/Jadwal";
import JadwalAdd from "./pages/JadwalAdd";
import JadwalUpdate from "./pages/JadwalUpdate";
import Driver from "./pages/Driver";
import DriverOption from "./pages/DriverOption";
import DriverAdd from "./pages/DriverAdd";
import RekapTransaksi from "./pages/RekapTransaksi";
import LaporanTransaksi from "./pages/LaporanTransaksi";
import RincianLaporan from "./pages/RincianLaporan";

import Armada from "./pages/Armada";
import ArmadaAdd from "./pages/ArmadaAdd";
import ArmadaUpdate from "./pages/ArmadaUpdate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/transaksi/detail/:id" element={<TransaksiDetail />} />
        <Route path="/rute" element={<Rute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/jam" element={<Jam />} />
        <Route path="/user" element={<User />} />
        <Route path="/rute/add" element={<RuteAdd />} />
        <Route path="/rute/update/:id" element={<RuteUpdate />} />
        <Route path="/jam/add" element={<JamAdd />} />
        <Route path="/jam/update/:id" element={<JamUpdate />} />
        <Route path="/hari" element={<Hari />} />
        <Route path="/hari/add" element={<HariAdd />} />
        <Route path="/hari/update" element={<HariUpdate />} />
        <Route path="/jadwal/" element={<Jadwal />} />
        <Route path="/jadwal/add" element={<JadwalAdd />} />
        <Route path="/jadwal/update/:id" element={<JadwalUpdate />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/driver/option/:id" element={<DriverOption />} />
        <Route path="/driver/add" element={<DriverAdd />} />
        <Route path="/transaksi/rekap" element={<RekapTransaksi />} />
        <Route path="/transaksi/laporan/:driverId/:tglAwal/:tglAkhir" element={<LaporanTransaksi />} />
        <Route path="/transaksi/laporan/all" element={<RincianLaporan />} />

        <Route path="/armada" element={<Armada />} />
        <Route path="/armada/add" element={<ArmadaAdd />} />
        <Route path="/armada/update/:id" element={<ArmadaUpdate />} />
      </Routes>
    </>
  );
}

export default App;
