import React, { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/layouts/Breadcrumb";

const RuteAdd = () => {
  const [arah, setArah] = useState("");
  const [harga, setHarga] = useState("");
  const navigate = useNavigate();

  const addRute = async () => {
    if (arah === "" || harga === "") {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else {
      let dataRute = {
        arah: arah,
        harga: harga,
      };

      try {
        axios
          .post(
            "https://backend-reservasi-production.up.railway.app/rute",
            dataRute,
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
              navigate("/rute")
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

  return (
    <div>
      <Navbar />
      <Breadcrumb/>
      <div className="container my-3">
        <form>
          <div className="form-group">
            <label>Arah Travel</label>
            <input
              type="text"
              className="form-control"
              id="rute"
              onChange={(e) => {
                setArah(e.target.value);
              }}
              placeholder="Masukkan Arah Travel (Cth : TULUNGAGUNG-SURABAYA)"
            />
          </div>
          <div className="form-group">
            <label>Harga Rute</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Masukkan Harga"
              onChange={(e) => {
                setHarga(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => addRute(e.preventDefault())}
          >
            <AiOutlinePlus />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RuteAdd;
