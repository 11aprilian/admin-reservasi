import React, { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { format } from "date-fns";
import Verifikasi from "../components/layouts/Verifikasi";

registerLocale("id", id);
setDefaultLocale("id");

const TanggalAdd = () => {
  const [tanggal, setTanggal] = useState("");
  const navigate = useNavigate();

  const addTanggal = async () => {
    if (tanggal === "") {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else {
      let dataTanggal = {
        tanggal: tanggal,
      };

      try {
        axios
          .post("http://localhost:3050/tanggal", dataTanggal, {
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
            navigate("/tanggal");
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

  const handleChange = (date) => {
    setTanggal(date);
    const formattedDate = format(date, "d MMMM yyyy", { locale: id });
    setTanggal(formattedDate);
    console.log(formattedDate);
  };

  return (
    <div>
      <Navbar />
      <Verifikasi />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <label>Tanggal Berangkat</label>
            <DatePicker
              className="form-control"
              value={tanggal}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => addTanggal(e.preventDefault())}
          >
            <AiOutlinePlus />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TanggalAdd;
