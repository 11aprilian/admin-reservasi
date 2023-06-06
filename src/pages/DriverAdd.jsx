import React, { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Verifikasi from "../components/layouts/Verifikasi";

const DriverAdd = () => {
  const [nama, setNama] = useState("");
  const navigate = useNavigate();

  const addDriver = async () => {
    if (nama === "") {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else {
      let dataDriver = {
        nama: nama
      };

      try {
        axios
          .post(
            "http://localhost:3050/driver",
            dataDriver,
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
                text: "Driver Berhasil Disimpan!",
                icon: "success",
                showConfirmButton: true,
              });
              navigate("/driver")
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
      <Verifikasi />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <label>Nama Driver</label>
            <input
              type="text"
              className="form-control"
              id="Driver"
              onChange={(e) => {
                setNama(e.target.value);
              }}
              placeholder="Masukkan Nama Driver"
            />
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => addDriver(e.preventDefault())}
          >
            <AiOutlinePlus />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverAdd;
