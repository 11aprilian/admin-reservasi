import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/layouts/Breadcrumb";

const RuteUpdate = () => {
  const [arah, setArah] = useState("");
  const [harga, setHarga] = useState("");
  const id = localStorage.getItem("idRute");
  const navigate = useNavigate();

  const fetchRuteById = () => {
    axios
      .get("http://localhost:3050/rute/" + id)
      .then((result) => {
        const responseAPI = result.data.data;
        setArah(responseAPI.arah);
        setHarga(responseAPI.harga);
      });
  };

  const updateRute = () => {
    let dataRute = {
      arah: arah,
      harga: harga,
    };

    Swal.fire({
      text: "Update Rute?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            "http://localhost:3050/rute/" + id,
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
              text: "Data Berhasil DiUpdate!",
              icon: "success",
              showConfirmButton: true,
            });
            navigate("/rute");
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
    fetchRuteById();
  }, []);
  console.log(arah, harga);
  return (
    <div>
      <Navbar />
      <div className="container m-3">
        <form>
        <div className="form-group">
            <label>ID Rute</label>
            <input
              type="text"
              className="form-control bg-light"
              id="rute"
              readOnly
              value={id}
            />
          </div>

          <div className="form-group">
            <label>Arah Travel</label>
            <input
              type="text"
              className="form-control"
              id="rute"
              value={arah}
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
              value={harga}
              placeholder="Masukkan Harga"
              onChange={(e) => {
                setHarga(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => updateRute(e.preventDefault())}
          >
            <BsFillPencilFill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RuteUpdate;
