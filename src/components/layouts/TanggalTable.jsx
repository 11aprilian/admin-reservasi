import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { id } from "date-fns/locale";

const JamTable = () => {
  const [dataTanggal, setDataTanggal] = useState([]);
  const [idTanggal, setIdTanggal] = useState("");
  const navigate = useNavigate();

  const fetchTanggal = () => {
    axios
      .get("http://localhost:3050/tanggal")
      .then((result) => {
        const responseAPI = result.data;

        setDataTanggal(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTanggal = () => {
    Swal.fire({
      text: "Hapus Tanggal?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            "http://localhost:3050/tanggal/" +
              idTanggal,
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


  const TanggalUpdate = () => {
    localStorage.setItem("idTanggal", idTanggal);
    if (!localStorage.idTanggal) {
      localStorage.setItem("idTanggal", idTanggal);
    } else {
      navigate("/tanggal/update");
    }
  };

  useEffect(() => {
    fetchTanggal();
  }, []);
  console.log(idTanggal);

  return (
    <div className="container-fluid table-responsive-sm">
      <div>
        <Link to="/tanggal/add" className="btn btn-sm btn-outline-dark my-3">Tambah Data +</Link>
      </div>
      <table className="table">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tanggal</th>
            <th scope="col">Dibuat</th>
            <th scope="col">DiUpdate</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataTanggal.map((Tanggal) => {
            return (
              <tr key={Tanggal.id}>
                <td>{Tanggal.id}</td>
                <td>{Tanggal.tanggal}</td>
                <td>{Tanggal.createdAt}</td>
                <td>{Tanggal.updatedAt}</td>
                <td>
                <Link
                to={`/jadwal/${Tanggal.id}`}
                    className="btn btn-sm m-1 btn-outline-primary me-4"
                  >
                    Buat Jadwal
                  </Link>
                  <button
                    className="btn btn-sm m-1 btn-outline-danger me-4"
                    onFocus={() => {
                      setIdTanggal(Tanggal.id);
                    }}
                    onClick={() => {
                      TanggalUpdate();
                    }}
                  >
                    <BsFillPencilFill/>
                  </button>
                  <button
                    className="btn btn-sm m-1 btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdTanggal(Tanggal.id);
                    }}
                    onClick={(e) => deleteTanggal(e.preventDefault())}
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
