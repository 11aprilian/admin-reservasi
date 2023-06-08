import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Verifikasi from "../components/layouts/Verifikasi";

const JadwalUpdate = () => {
  const [dataDriver, setDataDriver] = useState([]);
  const [dataJadwal, setDataJadwal] = useState([]);

  const [jam, setJam] = useState("");
  const [hari, setHari] = useState("");
  const [rute, setRute] = useState("");
  const [driver, setDriver] = useState("");
  const [driverUpdate, setDriverUpdate] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchJadwal = () => {
    axios
      .get("http://localhost:3050/jadwaldriver/" + id)
      .then((result) => {
        const responseAPI = result.data;

        setDataJadwal(responseAPI.data)
        setJam(responseAPI.data.Jam.jam)
        setHari(responseAPI.data.Hari.hari)
        setRute(responseAPI.data.Rute.arah)
        setDriver(responseAPI.data.Driver.nama)
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

  console.log(driverUpdate);
  const updateJadwalDriver = () => {
    let data = {
      DriverId: driverUpdate,
    };

    Swal.fire({
      text: "Update Driver?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("http://localhost:3050/jadwaldriver/" + id, data, {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              authorization: localStorage.getItem("adminToken"),
            },
          })
          .then(() => {
            Swal.fire({
              text: "Data Berhasil DiUpdate!",
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
      }
    });
  };

  useEffect(() => {
    fetchDriver();
    fetchJadwal();
  }, []);

  console.log(driverUpdate);

  return (
    <div>
      <Navbar />
      <Verifikasi />
      <div className="container m-3">
        <form>

         <div className="form-group m-3 col-md-4">
            <label>ID Jadwal</label>
            <input className="form-control mt-1" value={id} disabled />
          </div>

          <div className="form-group m-3 col-md-4">
            <label>Jam</label>
            <input className="form-control mt-1" value={jam} disabled />
          </div>

          <div className="form-group m-3 col-md-4">
            <label>Hari</label>
            <input className="form-control mt-1" value={hari} disabled />
          </div>

          <div className="form-group m-3 col-md-4">
            <label>Rute</label>
            <input className="form-control mt-1" value={rute} disabled />
          </div>

          <div className="form-group m-3 col-md-4">
            <label>Driver Sekarang</label>
            <input className="form-control mt-1" value={driver} disabled />
          </div>

          <div className="form-group m-3 col-md-4">
            <label>Masukkan Driver</label>
            <select
              id="rute"
              className="form-control mt-1"
              onChange={(e) => {
                setDriverUpdate(e.target.value);
              }}
            >
                <option>Pilih Driver</option>
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
            onClick={(e) => updateJadwalDriver(e.preventDefault())}
          >
            <BsFillPencilFill/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default JadwalUpdate;
