import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Verifikasi from "../components/layouts/Verifikasi";

const JadwalUpdate = () => {
  const [dataDriverOpt, setDataDriverOpt] = useState([]);

  const [dataJadwal, setDataJadwal] = useState([]);
  const [jadwal, setJadwal] = useState("");

  const [dataTanggal, setDataTanggal] = useState([]);
  const [tanggal, setTanggal] = useState(0);

  const [driver, setDriver] = useState("");
  const [jadwalDriver, setJadwalDriver] = useState("");
  const [idDriverOpt, setidDriverOpt] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDriverOptionByDriverId = () => {
    axios
      .get("http://localhost:3050/driveroption/driver/" + id)
      .then((result) => {
        const responseAPI = result.data.data;
        setDataDriverOpt(responseAPI);
      });
  };

  const fetchJadwal = () => {
    axios
      .get("http://localhost:3050/jadwaldriver/tanggal/" + tanggal)
      .then((result) => {
        const responseAPI = result.data.data;
        setDataJadwal(responseAPI);
      });
  };

  const fetchTanggal = () => {
    axios.get("http://localhost:3050/tanggal").then((result) => {
      const responseAPI = result.data.data;
      setDataTanggal(responseAPI);
    });
  };

  const addDriverOpt = async () => {
    if (jadwal === "") {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else {
      let data = {
        DriverId: driver,
        JadwalDriverId: jadwal,
      };

      try {
        axios
          .post("http://localhost:3050/driveroption", data, {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              authorization: localStorage.getItem("adminToken"),
            },
          })
          .then(() => {
            Swal.fire({
              text: "Data Berhasil Disimpan!",
              icon: "success",
              showConfirmButton: true,
            });
          })
          .then(() => {
            fetchDriverOptionByDriverId();
          })
          .catch(() => {
            Swal.fire({
              text: "Anda Tidak Memiliki Akses!",
              icon: "error",
            });
          });
      } catch (error) {
        console.log(error);
        Swal.fire({
          text: "Gagal Menambahkan Data!",
          icon: "error",
        });
      }
    }
  };

  const deleteDriverOpt = () => {
    Swal.fire({
      text: "Hapus Jadwal?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:3050/driveroption/" + idDriverOpt, {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              authorization: localStorage.getItem("adminToken"),
            },
          })
          .then(() => {
            Swal.fire({
              text: "Data Berhasil Dihapus!",
              icon: "success",
            })
              .then(() => {
                fetchDriverOptionByDriverId();
              })
              .catch(() => {
                Swal.fire({
                  text: "Anda Tidak Memiliki Akses!",
                  icon: "error",
                });
              });
          });
      }
    });
  };

  useEffect(() => {
    setDriver(id);
    fetchDriverOptionByDriverId();
    fetchTanggal();
  }, []);

  return (
    <div>
      <Navbar />
      <Verifikasi />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <h3>Atur Jadwal Pada Driver</h3>
            <label>ID Driver</label>
            <input
              type="text"
              className="bg-light form-control"
              id="idDriverOpt"
              value={id}
              readOnly
            />
          </div>

          <div className="d-flex">
            <div className="form-group my-3 col-md-4">
              <label>Masukkan Tanggal</label>
              <select
                id="rute"
                className="form-control mt-1"
                onChange={(e) => {
                  setTanggal(e.target.value);
                }}
                onMouseLeave={() => fetchJadwal()}
              >
                <option>Tanggal Yang Tersedia</option>
                {dataTanggal.map((tgl) => {
                  return (
                    <option key={tgl.id} value={tgl.id}>
                      {tgl.tanggal}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group m-3 col-md-4">
              <label>Masukkan Jam</label>
              <select
                id="rute"
                className="form-control mt-1"
                onChange={(e) => {
                  setJadwal(e.target.value);
                }}
              >
                <option>Tanggal Yang Tersedia</option>
                {dataJadwal.map((jam) => {
                  return (
                    <option key={jam.id} value={jam.id}>
                      {jam.Jadwal.jam}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={() => {
              addDriverOpt();
            }}
          >
            <AiOutlinePlus />
          </button>
        </form>

        <div className="mt-3">
          <table className="table">
            <thead className="thead-dark bg-dark text-white">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Jam</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataDriverOpt.map((option) => {
                return (
                  <tr key={option.id}>
                    <td>{option.id}</td>
                    <td>{option.Jadwal_driver.Tanggal.tanggal}</td>
                    <td>{option.Jadwal_driver.Jadwal.jam}</td>
                    <td>{option.status}</td>
                    <td>
                      <button
                        className="btn m-1 btn-sm btn-outline-secondary"
                        onMouseEnter={() => {
                          setidDriverOpt(option.id);
                        }}
                        onClick={(e) => deleteDriverOpt(e.preventDefault())}
                      >
                        <BsFillTrash3Fill />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JadwalUpdate;
