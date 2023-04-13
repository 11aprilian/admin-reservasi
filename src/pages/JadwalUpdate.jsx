import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/layouts/Breadcrumb";

const JadwalUpdate = () => {
  const [jam, setJam] = useState("");
  const id = localStorage.getItem("idJadwal");
  const navigate = useNavigate();

  const fetchJadwalById = () => {
    axios
      .get("https://backend-reservasi-production.up.railway.app/jadwal/" + id)
      .then((result) => {
        const responseAPI = result.data.data;
        setJam(responseAPI.jam);
      });
  };

  const updateJadwal = () => {
    let dataJadwal = {
      jam: jam,
    };

    Swal.fire({
      text: "Update Jadwal?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            "https://backend-reservasi-production.up.railway.app/jadwal/" + id,
            dataJadwal,
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("adminToken"),
              },
            }
          )
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
    fetchJadwalById();
  }, []);
  console.log(jam);

  return (
    <div>
      <Navbar />
      <Breadcrumb/>
      <div className="container my-3">
        <form>
        <div className="form-group">
            <label>ID Jadwal</label>
            <input
              type="text"
              className="bg-light form-control"
              id="idJadwal"
              value={id}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Jam Berangkat</label>
            <input
              type="text"
              className="form-control"
              id="jam"
              value={jam}
              onChange={(e) => {
                setJam(e.target.value);
              }}
              placeholder="Masukkan Jam Berangkat (Cth : 04.00)"
            />
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => updateJadwal(e.preventDefault())}
          >
            <BsFillPencilFill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default JadwalUpdate;
