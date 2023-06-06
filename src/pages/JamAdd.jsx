import React, { useState } from 'react'
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../components/layouts/Breadcrumb';
import Verifikasi from "../components/layouts/Verifikasi";

const JamAdd = () => {
    const [jam, setJam] = useState("");
    const navigate = useNavigate();

    const addJadwal = async () => {
        if (jam === "" ) {
          Swal.fire({
            icon: "error",
            text: "Data Tidak Boleh Kosong!",
          });
        } else {
          let dataJadwal = {
            jam: jam
          };
    
          try {
            axios
              .post(
                "http://localhost:3050/jadwal",
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
                    text: "Data Berhasil Disimpan!",
                    icon: "success",
                    showConfirmButton: true,
                  });
                  navigate("/jam")
              })
              .catch(() => {
                Swal.fire({
                    text : "Anda Tidak Memiliki Akses!",
                    icon : "error"
                })
              })
          } catch (error) {
            console.log(error);
            Swal.fire({
              text: "Gagal Menambahkan Data!",
              icon: "error",
            });
          }
        }
      };

    console.log(jam);
  return (
    <div>
        <Navbar />
        <Verifikasi />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <label>Jam Berangkat</label>
            <input
              type="text"
              className="form-control"
              id="rute"
              onChange={(e) => {
                setJam(e.target.value);
              }}
              placeholder="Masukkan Jam Berangkat (Cth : 04.00)"
            />
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
  )
}

export default JamAdd