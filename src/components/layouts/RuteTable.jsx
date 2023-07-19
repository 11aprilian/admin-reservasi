import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RuteTable = () => {
  const [dataRute, setDataRute] = useState([]);
  const [idRute, setIdRute] = useState("");
  const navigate = useNavigate();

  const fetchRute = () => {
    axios
      .get("http://localhost:3050/rute")
      .then((result) => {
        const responseAPI = result.data;

        setDataRute(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRute = () => {
    Swal.fire({
      text: "Hapus Rute?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            "http://localhost:3050/rute/" +
              idRute,
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

  useEffect(() => {
    fetchRute();
  }, []);

  console.log(idRute);

  return (
    <div className="container-fluid table-responsive-sm">
      <div>
        <Link to="/rute/add" className="btn btn-sm btn-outline-dark my-3">
          Tambah Data +
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Arah</th>
            <th scope="col">Harga</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataRute.map((rute, index) => {
            return (
              <tr key={rute.id}>
                <td>{index + 1}</td>
                <td>{rute.arah}</td>
                <td>{rute.harga}</td>
                <td>
                <Link
                    to={`/rute/update/${rute.id}`}
                    className="btn btn-sm m-1 btn-outline-primary me-4"
                  >
                    <BsFillPencilFill />{" "}Edit Rute
                  </Link>
                  <button
                    className="btn m-1 btn-sm btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdRute(rute.id);
                    }}
                    onClick={(e) => deleteRute(e.preventDefault())}
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

export default RuteTable;
