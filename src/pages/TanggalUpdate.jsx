import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { format } from "date-fns";

registerLocale("id", id);
setDefaultLocale("id");

const TanggalUpdate = () => {
  const [tanggal, setTanggal] = useState("");
  const idTanggal = localStorage.getItem("idTanggal");
  const navigate = useNavigate();

  const fetchTanggalById = () => {
    axios.get("http://localhost:3050/tanggal/" + id).then((result) => {
      const responseAPI = result.data;
      setTanggal(responseAPI.Tanggal);
    });
  };

  const updateTanggal = () => {
    let dataTanggal = {
      tanggal: tanggal,
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
          .put("http://localhost:3050/tanggal/" + idTanggal, dataTanggal, {
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
            navigate("/tanggal");
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

  const handleChange = (date) => {
    setTanggal(date);
    const formattedDate = format(date, "d MMMM yyyy", { locale: id });
    setTanggal(formattedDate);
    console.log(formattedDate);
  };

  useEffect(() => {
    fetchTanggalById();
  }, []);
  console.log(tanggal);

  return (
    <div>
      <Navbar />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <label>ID Jadwal</label>
            <input
              type="text"
              className="bg-light form-control"
              id="idTgl"
              value={idTanggal}
              readOnly
            />
          </div>

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
            onClick={(e) => updateTanggal(e.preventDefault())}
          >
            <BsFillPencilFill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TanggalUpdate;
