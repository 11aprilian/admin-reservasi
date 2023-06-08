import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Verifikasi from "../components/layouts/Verifikasi";

const JadwalAdd = () => {
  const [dataJam, setDataJam] = useState([]);
  const [dataHari, setDataHari] = useState([]);
  const [dataRute, setDataRute] = useState([]);
  const [dataDriver, setDataDriver] = useState([]);

  const [jam, setJam] = useState("");
  const [hari, setHari] = useState("");
  const [rute, setRute] = useState("");
  const [driver, setDriver] = useState("");

  const navigate = useNavigate();


  const fetchJam = () => {
    axios
      .get("http://localhost:3050/jam")
      .then((result) => {
        const responseAPI = result.data;

        setDataJam(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchHari = () => {
    axios
      .get("http://localhost:3050/hari")
      .then((result) => {
        const responseAPI = result.data;

        setDataHari(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRute = () => {
    axios
      .get("http://localhost:3050/rute")
      .then((result) => {
        const responseAPI = result.data;

        setDataRute(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDriver = () => {
    axios
      .get("http://localhost:3050/driver")
      .then((result) => {
        const responseAPI = result.data;

        setDataDriver(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addJadwal = async () => {
    if (jam === "") {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else {
      let data = {
        JamId : jam,
        HariId : hari,
        RuteId : rute,
        DriverId : driver
      };

      try {
        axios
          .post("http://localhost:3050/jadwaldriver", data, {
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
            navigate("/jadwal");
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

  useEffect(() => {
    fetchJam();
    fetchHari();
    fetchRute();
    fetchDriver();
  }, []);

  console.log(jam, hari, rute, driver);

  return (
    <div>
      <Navbar />
      <Verifikasi />
      <div className="container m-3">
        <form>

        <div className="form-group m-3 col-md-4">
              <label>Masukkan Jam</label>
              <select
                id="rute"
                className="form-control mt-1"
                onChange={(e) => {
                  setJam(e.target.value);
                }}
              >
                <option value={0}>Jam Yang Tersedia</option>
                {dataJam.map((jam) => {
                  return (
                    <option key={jam.id} value={jam.id}>
                      {jam.jam}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group m-3 col-md-4">
              <label>Masukkan Hari</label>
              <select
                id="rute"
                className="form-control mt-1"
                onChange={(e) => {
                  setHari(e.target.value);
                }}
              >
                <option value={0}>Hari Yang Tersedia</option>
                {dataHari.map((hari) => {
                  return (
                    <option key={hari.id} value={hari.id}>
                      {hari.hari}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group m-3 col-md-4">
              <label>Masukkan Rute</label>
              <select
                id="rute"
                className="form-control mt-1"
                onChange={(e) => {
                  setRute(e.target.value);
                }}
              >
                <option value={0}>Rute Yang Tersedia</option>
                {dataRute.map((rute) => {
                  return (
                    <option key={rute.id} value={rute.id}>
                      {rute.arah}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group m-3 col-md-4">
              <label>Masukkan Driver</label>
              <select
                id="rute"
                className="form-control mt-1"
                onChange={(e) => {
                  setDriver(e.target.value);
                }}
              >
                <option value={0}>Driver Yang Tersedia</option>
                {dataDriver.map((driver) => {
                  return (
                    <option key={driver.id} value={driver.id}>
                      {driver.nama}
                    </option>
                  );
                })}
              </select>
            </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => addJadwal(e.preventDefault())}
          >
            <AiOutlinePlus />
          </button>
        </form>
      </div>
    </div>
  );
};

export default JadwalAdd;
