import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const JamTable = () => {
  const [dataJadwal, setDataJadwal] = useState([]);
  const [idJadwal, setIdJadwal] = useState("");
  const navigate = useNavigate();

  const fetchJadwal = () => {
    axios
      .get("http://localhost:3050/jadwal")
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
          .delete(
            "http://localhost:3050/jadwal/" +
              idJadwal,
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
              text: "Data Berhasil Dihapus!",
              icon: "success",
            });
          });
      }
    });
  };


  const jadwalUpdate = () => {
    localStorage.setItem("idJadwal", idJadwal);
    if (!localStorage.idJadwal) {
      localStorage.setItem("idJadwal", idJadwal);
    } else {
      navigate("/jam/update");
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);
  console.log(idJadwal);

  return (
    <div className="container-fluid table-responsive-sm">
      <div>
        <Link to="/jam/add" className="btn btn-sm btn-outline-dark my-3">Tambah Data +</Link>
      </div>
      <table className="table">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Jam</th>
            <th scope="col">Dibuat</th>
            <th scope="col">DiUpdate</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataJadwal.map((jadwal) => {
            return (
              <tr key={jadwal.id}>
                <td>{jadwal.id}</td>
                <td>{jadwal.jam}</td>
                <td>{jadwal.createdAt}</td>
                <td>{jadwal.updatedAt}</td>
                <td>
                  <button
                    className="btn btn-sm m-1 btn-outline-danger me-4"
                    onFocus={() => {
                      setIdJadwal(jadwal.id);
                    }}
                    onClick={() => {
                      jadwalUpdate();
                    }}
                  >
                    <BsFillPencilFill/>
                  </button>
                  <button
                    className="btn btn-sm m-1 btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdJadwal(jadwal.id);
                    }}
                    onClick={(e) => deleteJadwal(e.preventDefault())}
                  >
                    <BsFillTrash3Fill/>
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

export default JamTable;
