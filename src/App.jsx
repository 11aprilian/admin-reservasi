import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Transaksi from "./pages/Transaksi";
import Rute from "./pages/Rute";
import Login from "./pages/Login";
import Jadwal from "./pages/Jadwal";
import User from "./pages/User";
import TransaksiDetail from "./pages/TransaksiDetail";
import RuteAdd from "./pages/RuteAdd";
import RuteUpdate from "./pages/RuteUpdate";
import JadwalAdd from "./pages/JadwalAdd";
import JadwalUpdate from "./pages/JadwalUpdate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/rute" element={<Rute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/user" element={<User />} />
        <Route path="/transaksi/detail" element={<TransaksiDetail />} />
        <Route path="/rute/add" element={<RuteAdd />} />
        <Route path="/rute/update" element={<RuteUpdate />} />
        <Route path="/jadwal/add" element={<JadwalAdd />} />
        <Route path="/jadwal/update" element={<JadwalUpdate />} />
      </Routes>
    </>
  );
}

export default App;
