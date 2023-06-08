import axios from "axios";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Verifikasi from "../components/layouts/Verifikasi";

const TransaksiDetail = () => {
  const { id } = useParams();
  const [dataTrans, setDataTrans] = useState([]);

  const [nama, setNama] = useState("");
  const [idTrans, setIdTrans] = useState("");
  const [tglTransaksi, setTglTransaksi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [rute, setRute] = useState("");
  const [tglBerangkat, setTglBerangkat] = useState("");
  const [hari, setHari] = useState("");
  const [jam, setJam] = useState("");
  const [telepon, setTelepon] = useState("");
  const [bank, setBank] = useState("");
  const [va, setVa] = useState("");
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState("");
  const [userId, setUserId] = useState("");
  const [ruteId, setRuteId] = useState("");
  const [jadwalId, setJadwalId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [driverName, setDriverName] = useState("");


  const fetchTransaksi = () => {
    axios
      .get("http://localhost:3050/transaksi/" + id)
      .then((result) => {
        const responseAPI = result.data;

        setDataTrans(responseAPI.data);
        setNama(responseAPI.data.nama);
        setIdTrans(responseAPI.data.id);
        setAlamat(responseAPI.data.alamat);
        setTglBerangkat(responseAPI.data.tanggal);
        setJam(responseAPI.data.Jadwal_driver.Jam.jam);
        setHari(responseAPI.data.Jadwal_driver.Hari.hari);
        setTelepon(responseAPI.data.no_hp);
        setBank(responseAPI.data.bank);
        setVa(responseAPI.data.va_number);
        setStatus(responseAPI.data.paid);
        setTotal(responseAPI.data.total);
        setTglTransaksi(responseAPI.data.createdAt);
        setRute(responseAPI.data.Jadwal_driver.Rute.arah);
        setUserId(responseAPI.data.User.id);
        setRuteId(responseAPI.data.Jadwal_driver.Rute.id);
        setJadwalId(responseAPI.data.JadwalDriverId);
        setDriverId(responseAPI.data.Jadwal_driver.DriverId);
        setDriverName(responseAPI.data.Jadwal_driver.Driver.nama);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  console.log(driverId);
  return (
    <div>
      <Navbar />
      <Verifikasi />
      <div>
        <div className="card m-3">
          <div className="card-body">
            <h5 className="card-title ms-2 fw-bold text-danger">{idTrans}</h5>
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
                    <td>{hari},{" "}{tglBerangkat}</td>
                  </tr>
                  <tr>
                    <td>Rute</td>
                    <td> : </td>
                    <td>{rute}</td>
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
                    <td>Nama Driver</td>
                    <td> : </td>
                    <td>{driverName}</td>
                  </tr>
                  <tr>
                    <td>ID User</td>
                    <td> : </td>
                    <td>
                      <input
                        className="form-control-sm bg-white"
                        value={userId}
                        placeholder={userId}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>ID Rute</td>
                    <td> : </td>
                    <td>
                      <input
                        className="form-control-sm bg-white"
                        value={ruteId}
                        placeholder={ruteId}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>ID Jadwal</td>
                    <td> : </td>
                    <td>
                      <input
                        className="form-control-sm bg-white"
                        value={jadwalId}
                        placeholder={jadwalId}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>ID Driver</td>
                    <td> : </td>
                    <td className="d-flex justify-content-between">
                      <input
                        className="form-control-sm bg-white"
                        value={driverId}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr></tr>
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
