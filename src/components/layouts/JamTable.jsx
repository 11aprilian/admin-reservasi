import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const JamTable = () => {
  const [dataJam, setDataJam] = useState([]);
  const [idJam, setIdJam] = useState("");
  const navigate = useNavigate();

  const fetchJam = () => {
    axios
      .get("http://localhost:3050/jam")
      .then((result) => {
        const responseAPI = result.data;

        setDataJam(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteJam = () => {
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
            "http://localhost:3050/jam/" +
              idJam,
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
    fetchJam();
  }, []);
  console.log(idJam);

  return (
    <div className="container-fluid table-responsive-sm">
      <div>
        <Link to="/jam/add" className="btn btn-sm btn-outline-dark my-3">Tambah Data +</Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Jam</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataJam.map((Jam, index) => {
            return (
              <tr key={Jam.id}>
                <td>{index + 1}</td>
                <td>{Jam.jam}</td>
                <td>
                <Link
                    to={`/jam/update/${Jam.id}`}
                    className="btn btn-sm m-1 btn-outline-primary me-4"
                  >
                    <BsFillPencilFill />{" "}Ubah Jam
                  </Link>
                  <button
                    className="btn btn-sm m-1 btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdJam(Jam.id);
                    }}
                    onClick={(e) => deleteJam(e.preventDefault())}
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
