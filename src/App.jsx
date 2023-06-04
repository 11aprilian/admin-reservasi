import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Transaksi from "./pages/Transaksi";
import Rute from "./pages/Rute";
import Login from "./pages/Login";
import Jam from "./pages/Jam";
import User from "./pages/User";
import TransaksiDetail from "./pages/TransaksiDetail";
import RuteAdd from "./pages/RuteAdd";
import RuteUpdate from "./pages/RuteUpdate";
import JamAdd from "./pages/JamAdd";
import JamUpdate from "./pages/JamUpdate";
import Tanggal from "./pages/Tanggal";
import TanggalAdd from "./pages/TanggalAdd";
import TanggalUpdate from "./pages/TanggalUpdate";
import Jadwal from "./pages/Jadwal";
import Driver from "./pages/Driver";
import DriverOption from "./pages/DriverOption";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/rute" element={<Rute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jam" element={<Jam />} />
        <Route path="/user" element={<User />} />
        <Route path="/transaksi/detail" element={<TransaksiDetail />} />
        <Route path="/rute/add" element={<RuteAdd />} />
        <Route path="/rute/update" element={<RuteUpdate />} />
        <Route path="/jam/add" element={<JamAdd />} />
        <Route path="/jam/update" element={<JamUpdate />} />
        <Route path="/tanggal" element={<Tanggal />} />
        <Route path="/tanggal/add" element={<TanggalAdd />} />
        <Route path="/tanggal/update" element={<TanggalUpdate />} />
        <Route path="/jadwal/:id" element={<Jadwal />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/driver/option/:id" element={<DriverOption />} />
      </Routes>
    </>
  );
}

export default App;
