import axios from "axios";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import Verifikasi from "../components/layouts/Verifikasi";

const TransaksiDetail = () => {
  const idTrans = localStorage.getItem("idTrans");
  const [dataTrans, setDataTrans] = useState([]);
  const [dataDriverOpt, setDataDriverOpt] = useState([]);

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
  const [driverId, setDriverId] = useState("Belum Diatur");
  const [driverOptId, setDriverOptId] = useState("");
  const [driverName, setDriverName] = useState("");

  const [idDriver, setIdDriver] = useState("Belum Diatur");

  const fetchTransaksi = () => {
    axios
      .get("http://localhost:3050/transaksi/" + idTrans)
      .then((result) => {
        const responseAPI = result.data;

        setDataTrans(responseAPI.data);
        setNama(responseAPI.data.nama);
        setId(responseAPI.data.id);
        setAlamat(responseAPI.data.alamat);
        setTglBerangkat(responseAPI.data.Jadwal_driver.Tanggal.tanggal);
        setJam(responseAPI.data.Jadwal_driver.Jadwal.jam);
        setTelepon(responseAPI.data.no_hp);
        setBank(responseAPI.data.bank);
        setVa(responseAPI.data.va_number);
        setStatus(responseAPI.data.paid);
        setTotal(responseAPI.data.total);
        setTglTransaksi(responseAPI.data.createdAt);
        setRute(responseAPI.data.Rute.arah);
        setUserId(responseAPI.data.User.id);
        setRuteId(responseAPI.data.Rute.id);
        setJadwalId(responseAPI.data.JadwalDriverId);
        setDriverId(responseAPI.data.DriverId);
        setDriverName(responseAPI.data.Driver.nama);
        setDriverId(responseAPI.data.Driver.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDriverOptionByJadwal = () => {
    axios
      .get("http://localhost:3050/driveroption/jadwaldriver/" + jadwalId)
      .then((result) => {
        const responseAPI = result.data.data;
        setDataDriverOpt(responseAPI);
      });
  };

  const setDriver = () => {
    let driver = {
      DriverId: idDriver,
    };

    Swal.fire({
      text: "Set Driver?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("http://localhost:3050/transaksi/" + id, driver, {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              authorization: localStorage.getItem("adminToken"),
            },
          })
          .then(() => {
            Swal.fire({
              text: "Driver Berhasil Disimpan!",
              icon: "success",
              showConfirmButton: true,
            });
          })
          .then(() => {
            updateOptStatus();
            fetchTransaksi();
          })
          .catch(() => {
            Swal.fire({
              text: "Anda Tidak Memiliki Akses!",
              icon: "error",
            });
          });
      }
    });
  };

  const updateOptStatus = () => {
    let status = {
      status: "unavailable",
    };
    axios.put("http://localhost:3050/driveroption/" + driverOptId, status, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        authorization: localStorage.getItem("adminToken"),
      },
    });
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  console.log(driverId);
  console.log(idDriver)
  ;
  return (
    <div>
      <Navbar />
      <Verifikasi />
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
                    <td>ID Jadwal Driver</td>
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

                      {driverId === null && (
                        <select
                        id="rute"
                        className="form-control-sm"
                        onChange={(e) => {
                          setIdDriver(e.target.value);
                          setDriverOptId(
                            e.target.options[
                              e.target.selectedIndex
                            ].getAttribute("data-key")
                          );
                        }}
                        onFocus={() => {
                          fetchDriverOptionByJadwal();
                        }}
                      >
                        <option>Pilih Driver</option>
                        {dataDriverOpt.map((driverOpt) => {
                          return (
                            <option
                              key={driverOpt.id}
                              data-key={driverOpt.id}
                              value={driverOpt.DriverId}
                            >
                              {driverOpt.Driver.nama}
                            </option>
                          );
                        })}
                      </select>
                      )}

                      {driverId === null && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setDriver();
                          }}
                        >
                          Submit
                        </button>
                      )}
                      
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Driver</td>
                    <td> : </td>
                    <td>{driverName}</td>
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
