import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";

const JadwalTable = () => {
  const [dataJadwal, setDataJadwal] = useState([]);
  const [dataHari, setDataHari] = useState([]);

  const [namaHari, setNamaHari] = useState("");
  const [idJadwal, setIdJadwal] = useState("");

  const filteredData = namaHari
    ? dataJadwal.filter((jadwal) => jadwal.Hari.hari === namaHari)
    : dataJadwal;

  const fetchJadwalDriver = () => {
    axios
      .get("http://localhost:3050/jadwaldriver/")
      .then((result) => {
        const responseAPI = result.data;
        setDataJadwal(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteJadwal = () => {
    Swal.fire({
      text: "Hapus Jadwal?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:3050/jadwaldriver/" + idJadwal, {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              authorization: localStorage.getItem("adminToken"),
            },
          })
          .then(() => {
            Swal.fire({
              text: "Data Berhasil Dihapus!",
              icon: "success",
            });
          });
      }
    });
  };

  const fetchHari = () => {
    axios
      .get("http://localhost:3050/hari")
      .then((result) => {
        const responseAPI = result.data;
        setDataHari(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchJadwalDriver();
    fetchHari();
  }, []);

  return (
    <div className="container-fluid table-responsive-sm">
      <div>
        <Link to="/jadwal/add" className="btn btn-sm btn-outline-dark mt-3">
          Tambah Data +
        </Link>
      </div>

      <div className="my-2">
      <div className="form-check form-check-inline">
              <input
                className="form-check-input small"
                type="radio"
                name="flexRadioDefault"
                value=""
                onClick={(e) => setNamaHari(e.target.value)}
              />
              <label className="form-check-label small ">Semua</label>
            </div>
        {dataHari.map((hari) => {
          return (
            <div className="form-check form-check-inline" key={hari.id}>
              <input
                className="form-check-input small"
                type="radio"
                name="flexRadioDefault"
                value={hari.hari}
                onClick={(e) => setNamaHari(e.target.value)}
              />
              <label className="form-check-label small ">{hari.hari}</label>
            </div>
          );
        })}
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark bg-dark text-white">
          <tr>
          <th scope="col">No</th>
            <th scope="col">Jam</th>
            <th scope="col">Hari</th>
            <th scope="col">Rute</th>
            <th scope="col">Driver</th>
            <th scope="col">Armada</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((jadwal, index) => {
            return (
              <tr key={jadwal.id}>
                <td>{index + 1}</td>
                <td>{jadwal.Jam.jam}</td>
                <td>{jadwal.Hari.hari}</td>
                <td>{jadwal.Rute.arah}</td>
                <td>{jadwal.Driver.nama}</td>
                <td>{jadwal.Armada.nama}</td>
                <td>
                  <Link
                    to={`/jadwal/update/${jadwal.id}`}
                    className="btn btn-sm m-1 btn-outline-primary me-4"
                  >
                    <BsFillPencilFill />{" "}Edit
                  </Link>
                  <button
                    className="btn btn-sm m-1 btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdJadwal(jadwal.id);
                    }}
                    onClick={(e) => deleteJadwal(e.preventDefault())}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JadwalTable;
