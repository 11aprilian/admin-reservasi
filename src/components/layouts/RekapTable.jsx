import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const RekapTable = () => {
  const [dataRekap, setDataRekap] = useState([]);

  const [tglMulai, setTglMulai] = useState("");
  const [tglSelesai, setTglSelesai] = useState("");
  const [selected, setSelected] = useState("");

  const [totalPendapatan, setTotalPendapatan] = useState("")

  const navigate = useNavigate();

  const fetchRekap = () => {
    axios
      .get("http://localhost:3050/transaksi/rekap/" + tglMulai + "/" + tglSelesai)
      .then((result) => {
        const responseAPI = result.data;
        const totalHarga = responseAPI.data.reduce(
          (totalAll, transaksi) => totalAll + parseInt(transaksi.total_pendapatan),
          0
        );

        setDataRekap(responseAPI.data);
        setTotalPendapatan(totalHarga)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStartDate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setTglMulai(formattedDate);
    setSelected(date)
  };

  const handleEndDate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setTglSelesai(formattedDate);
  };

  useEffect(() => {
  }, []);

  console.log("tglMulai", tglMulai);
  console.log("tglSelesai", tglSelesai);
  console.log(dataRekap);
  console.log(totalPendapatan);
  return (
    <div className="container-fluid table-responsive-sm mt-3">
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <label className="small form-label">Tanggal Awal :</label>
          <DatePicker
            className="form-control"
            value={tglMulai}
            onChange={handleStartDate}
          />
        </div>
        <div className="col-md-4 mb-2">
        <label className="small form-label">Tanggal Akhir :</label>
          <div className="d-flex">
          <DatePicker
            className="form-control"
            value={tglSelesai}
            minDate={selected}
            onChange={handleEndDate}
          />
          <button className="btn btn-outline-danger ms-4" onClick={fetchRekap}>Filter</button>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <label className="small form-label">Total Pendapatan :</label>
          <input className="form-control" placeholder={"Rp. " + totalPendapatan} disabled/>
        </div>
      </div>
      <table className="table">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">Tanggal</th>
            <th scope="col">Nama Driver</th>
            <th scope="col">Total Transaksi</th>
            <th scope="col">Total Pendapatan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataRekap.map((transaksi, index) => {
            return (
              <tr key={index}>
                <td>{tglMulai}{" / "}{tglSelesai}</td>
                <td>{transaksi.Jadwal_driver.Driver.nama}</td>
                <td>{transaksi.jumlah_transaksi}</td>
                <td>{"Rp. "}{transaksi.total_pendapatan}</td>
                <td>
                  <Link
                    to={`/transaksi/laporan/${transaksi.Jadwal_driver.DriverId}/${tglMulai}/${tglSelesai}`}
                    className="btn btn-sm m-1 btn-outline-primary"
                  >
                    Rincian Laporan
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RekapTable;
