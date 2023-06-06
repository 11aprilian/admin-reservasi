import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Verifikasi from "../components/layouts/Verifikasi";

const JadwalUpdate = () => {
  const [dataJadwal, setDataJadwal] = useState([]);
  const [dataJam, setDataJam] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [idJadwal, setIdJadwal] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchJadwalByTanggalId = () => {
    axios
      .get("http://localhost:3050/jadwaldriver/tanggal/" + id)
      .then((result) => {
        const responseAPI = result.data.data;
        setDataJadwal(responseAPI);
      });
  };

  const fetchJam = () => {
    axios.get("http://localhost:3050/jadwal").then((result) => {
      const responseAPI = result.data.data;
      setDataJam(responseAPI);
    });
  };

  const addJadwal = async () => {
    if (jam === "") {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else {
      let data = {
        TanggalId: tanggal,
        JadwalId: jam,
      };

      try {
        axios
          .post("http://localhost:3050/jadwaldriver", data, {
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
          })
          .then(() => {
            fetchJadwalByTanggalId();
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
            })
              .then(() => {
                fetchJadwalByTanggalId();
              })
              .catch(() => {
                Swal.fire({
                  text: "Anda Tidak Memiliki Akses!",
                  icon: "error",
                });
              });
          });
      }
    });
  };

  useEffect(() => {
    setTanggal(id);
    fetchJadwalByTanggalId();
    fetchJam();
  }, []);

  console.log(tanggal, jam);
  return (
    <div>
      <Navbar />
      <Verifikasi />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <h3>Atur Jadwal</h3>
            <label>ID Tanggal</label>
            <input
              type="text"
              className="bg-light form-control"
              id="idJadwal"
              value={id}
              readOnly
            />
          </div>

          <div className="form-group my-3">
            <label>Pilih Jam Keberangkatan Yang Tersedia</label>
            <select
              id="rute"
              className="form-control"
              onChange={(e) => {
                setJam(e.target.value);
              }}
            >
              <option>Pilih Jam</option>
              {dataJam.map((jam) => {
                return (
                  <option key={jam.id} value={jam.id}>
                    {jam.jam}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={addJadwal}
          >
            <AiOutlinePlus />
          </button>
        </form>

        <div className="mt-3">
          <table className="table">
            <thead className="thead-dark bg-dark text-white">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Jam</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataJadwal.map((jadwal) => {
                return (
                  <tr key={jadwal.id}>
                    <td>{jadwal.id}</td>
                    <td>{jadwal.Tanggal.tanggal}</td>
                    <td>{jadwal.Jadwal.jam}</td>
                    <td>
                      <button
                        className="btn m-1 btn-sm btn-outline-secondary"
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
      </div>
    </div>
  );
};

export default JadwalUpdate;
