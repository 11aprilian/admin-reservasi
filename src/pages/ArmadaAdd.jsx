import React, { useState } from 'react'
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../components/layouts/Breadcrumb';
import Verifikasi from "../components/layouts/Verifikasi";

const ArmadaAdd = () => {
    const [armada, setArmada] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [urlGambar, setUrlGambar] = useState("");
    const navigate = useNavigate();

    const addJadwal = async () => {
        if (armada === "" || keterangan === "") {
          Swal.fire({
            icon: "error",
            text: "Data Tidak Boleh Kosong!",
          });
        } else {
          let data = {
            nama: armada,
            keterangan: keterangan,
            gambar: urlGambar
          };
    
          try {
            axios
              .post(
                "http://localhost:3050/armada",
                data,
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
                  navigate("/armada")
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

    console.log(armada, keterangan);
  return (
    <div>
        <Navbar />
        <Verifikasi />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <label>Nama Armada</label>
            <input
              type="text"
              className="form-control"
              id="rute"
              onChange={(e) => {
                setArmada(e.target.value);
              }}
              placeholder="Masukkan Nama Armada"
            />
          </div>

          <div className="form-group my-2">
            <label>Keterangan</label>
            <input
              type="text"
              className="form-control"
              id="rute"
              onChange={(e) => {
                setKeterangan(e.target.value);
              }}
              placeholder="Masukkan Keterangan"
            />
          </div>

          <div className="form-group my-2">
            <label>URL Gambar</label>
            <input
              type="text"
              className="form-control"
              id="rute"
              onChange={(e) => {
                setUrlGambar(e.target.value);
              }}
              placeholder="Masukkan URL Gambar"
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

export default ArmadaAdd