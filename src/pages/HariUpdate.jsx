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
import Verifikasi from "../components/layouts/Verifikasi";

registerLocale("id", id);
setDefaultLocale("id");

const TanggalUpdate = () => {
  const [hari, setHari] = useState("");
  const idHari = localStorage.getItem("idHari");
  const navigate = useNavigate();

  const fetchHariById = () => {
    axios.get("http://localhost:3050/hari/" + id).then((result) => {
      const responseAPI = result.data;
      setHari(responseAPI.Tanggal);
    });
  };

  const updateHari = () => {
    let dataTanggal = {
      hari: hari,
    };

    Swal.fire({
      text: "Update Hari?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("http://localhost:3050/hari/" + idHari, dataTanggal, {
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
            navigate("/hari");
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
    fetchHariById();
  }, []);
  console.log(hari);

  return (
    <div>
      <Navbar />
      <Verifikasi />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <label>ID Hari</label>
            <input
              type="text"
              className="bg-light form-control"
              id="idTgl"
              value={idHari}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Hari Berangkat</label>
            <input type="text" className="form-control" onChange={(e) => setHari(e.target.value)} />
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => updateHari(e.preventDefault())}
          >
            <BsFillPencilFill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TanggalUpdate;
