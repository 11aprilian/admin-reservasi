import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ArmadaTable = () => {
  const [dataArmada, setDataArmada] = useState([]);
  const [idArmada, setIdArmada] = useState("");
  const navigate = useNavigate();

  const fetchArmada = () => {
    axios
      .get("http://localhost:3050/armada")
      .then((result) => {
        const responseAPI = result.data;

        setDataArmada(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteArmada = () => {
    Swal.fire({
      text: "Hapus Armada?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            "http://localhost:3050/armada/" +
              idArmada,
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
              confirmButtonText: "Ok!",
            });
          })
          .then(() => {
            window.location.reload(); 
          })
      }
    });
  };

  useEffect(() => {
    fetchArmada();
  }, []);
  console.log(idArmada);

  return (
    <div className="container-fluid table-responsive-sm">
      <div>
        <Link to="/armada/add" className="btn btn-sm btn-outline-dark my-3">Tambah Data +</Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Armada</th>
            <th scope="col">Keterangan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataArmada.map((Armada, index) => {
            return (
              <tr key={Armada.id}>
                <td>{index + 1}</td>
                <td>{Armada.nama}</td>
                <td>{Armada.keterangan}</td>
                <td>
                <Link
                    to={`/armada/update/${Armada.id}`}
                    className="btn btn-sm m-1 btn-outline-primary me-4"
                  >
                    <BsFillPencilFill />{" "}Lanjutan
                  </Link>
                  <button
                    className="btn btn-sm m-1 btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdArmada(Armada.id);
                    }}
                    onClick={(e) => deleteArmada(e.preventDefault())}
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

export default ArmadaTable;
