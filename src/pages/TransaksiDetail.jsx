import axios from "axios";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Navbar from "../components/layouts/Navbar";

const TransaksiDetail = () => {
  const idTrans = localStorage.getItem("idTrans");
  const [dataTrans, setDataTrans] = useState([]);
  const [nama, setNama] = useState("");
  const [id, setId] = useState("");
  const [tglTransaksi, setTglTransaksi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [rute, setRute] = useState("");
  const [tglBerangkat, setTglBerangkat] = useState("");
  const [jam, setJam] = useState("");
  const [telepon, setTelepon] = useState("");
  const [bank, setBank] = useState("");
  const [va, setVa] = useState("");
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState("");
  const [userId, setUserId] = useState("");
  const [ruteId, setRuteId] = useState("");
  const [jadwalId, setJadwalId] = useState("");

  const fetchTransaksi = () => {
    axios
      .get(
        "https://backend-reservasi-production.up.railway.app/transaksi/" +
          idTrans
      )
      .then((result) => {
        const responseAPI = result.data;

        setDataTrans(responseAPI.data);
        setNama(responseAPI.data.nama);
        setId(responseAPI.data.id);
        setAlamat(responseAPI.data.alamat);
        setTglBerangkat(responseAPI.data.tanggal);
        setTelepon(responseAPI.data.no_hp);
        setBank(responseAPI.data.bank);
        setVa(responseAPI.data.va_number);
        setStatus(responseAPI.data.paid);
        setTotal(responseAPI.data.total);
        setTglTransaksi(responseAPI.data.createdAt);
        setRute(responseAPI.data.Rute.arah);
        setJam(responseAPI.data.Jadwal.jam);
        setUserId(responseAPI.data.User.id);
        setRuteId(responseAPI.data.Rute.id);
        setJadwalId(responseAPI.data.Jadwal.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);
  console.log(dataTrans);

  return (
    <div>
      <Navbar />
      <Breadcrumb/>
      <div>
        <div className="card m-3">
          <div className="card-body">
            <h5 className="card-title ms-2 fw-bold text-danger">{id}</h5>
            <h6 className="card-subtitle ms-2 mb-2 text-muted text-capitalize">
              {rute}
            </h6>
            <div className="table-responsive-sm">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td> : </td>
                    <td>{nama}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td> : </td>
                    <td>{alamat}</td>
                  </tr>
                  <tr>
                    <td>Telepon</td>
                    <td> : </td>
                    <td>{telepon}</td>
                  </tr>
                  <tr>
                    <td>Tgl Berangkat</td>
                    <td> : </td>
                    <td>{tglBerangkat}</td>
                  </tr>
                  <tr>
                    <td>Jam Berangkat</td>
                    <td> : </td>
                    <td>{jam}</td>
                  </tr>
                  <tr>
                    <td>Tgl Transaksi</td>
                    <td> : </td>
                    <td>{tglTransaksi}</td>
                  </tr>
                  <tr>
                    <td>Bank</td>
                    <td> : </td>
                    <td>{bank}</td>
                  </tr>
                  <tr>
                    <td>VA Number</td>
                    <td> : </td>
                    <td>{va}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td> : </td>
                    <td>Rp. {total}</td>
                  </tr>
                  <tr>
                    <td>Status Pembayaran</td>
                    <td> : </td>
                    <td>{status}</td>
                  </tr>
                  <tr>
                    <td>ID User</td>
                    <td> : </td>
                    <td>{userId}</td>
                  </tr>
                  <tr>
                    <td>ID Rute</td>
                    <td> : </td>
                    <td>{ruteId}</td>
                  </tr>
                  <tr>
                    <td>ID Jadwal</td>
                    <td> : </td>
                    <td>{jadwalId}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransaksiDetail;
