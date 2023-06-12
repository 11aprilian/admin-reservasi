import Navbar from "../components/layouts/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const LaporanTransaksi = () => {
  const { driverId, tglAwal, tglAkhir } = useParams();

  const [dataLaporan, setDataLaporan] = useState([]);
  const [dataDriver, setDataDriver] = useState([]);

  const [totalPendapatan, setTotalPendapatan] = useState("")

  const fetchLaporan = () => {
    axios
      .get(
        "http://localhost:3050/transaksi/report/" +
          driverId +
          "/" +
          tglAwal +
          "/" +
          tglAkhir
      )
      .then((result) => {
        const responseAPI = result.data;
        const totalHarga = responseAPI.data.reduce(
            (totalAll, transaksi) => totalAll + transaksi.total,
            0
          );

        setDataLaporan(responseAPI.data);
        setTotalPendapatan(totalHarga)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDriver = () => {
    axios
      .get(
        "http://localhost:3050/driver/" + driverId)
      .then((result) => {
        const responseAPI = result.data;

        setDataDriver(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLaporan();
    fetchDriver();
  }, []);
  console.log(totalPendapatan);
  return (
    <div>
      <Navbar />
      <div className="container-fluid table-responsive-sm mt-3">
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <label className="small form-label">Nama Driver :</label>
          <input className="form-control" placeholder={dataDriver.nama} disabled/>
        </div>
        <div className="col-md-3 mb-2">
          <label className="small form-label">Dari Tanggal :</label>
          <input className="form-control" placeholder={tglAwal} disabled/>
        </div>
        <div className="col-md-3 mb-2">
          <label className="small form-label">Sampai Tanggal :</label>
          <input className="form-control" placeholder={tglAkhir} disabled/>
        </div>
        <div className="col-md-3 mb-2">
          <label className="small form-label">Total Pendapatan :</label>
          <input className="form-control" placeholder={"Rp. "+totalPendapatan} disabled/>
        </div>
        </div>
        <table className="table">
          <thead className="thead-dark bg-dark text-white">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Pelanggan</th>
              <th scope="col">Alamat</th>
              <th scope="col">No Hp</th>
              <th scope="col">Driver</th>
              <th scope="col">Rute</th>
              <th scope="col">Waktu Transaksi</th>
              <th scope="col">Waktu Travel</th>
              <th scope="col">Uang Masuk</th>
            </tr>
          </thead>
          <tbody>
            {dataLaporan.map((transaksi, index) => {
              return (
                <tr key={transaksi.id}>
                  <td>{transaksi.id}</td>
                  <td>{transaksi.User.username}</td>
                  <td>{transaksi.alamat}</td>
                  <td>{transaksi.no_hp}</td>
                  <td>{transaksi.Jadwal_driver.Driver.nama}</td>
                  <td>{transaksi.Jadwal_driver.Rute.arah}</td>
                  <td>{transaksi.updatedAt}</td>
                  <td>{transaksi.tanggal}{", "}{transaksi.Jadwal_driver.Jam.jam}</td>
                  <td>{"Rp. "}{transaksi.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanTransaksi;
