import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { id } from "date-fns/locale";

const HariTable = () => {
  const [dataHari, setDataHari] = useState([]);
  const [idHari, setIdHari] = useState("");
  const navigate = useNavigate();

  const fetchTanggal = () => {
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

  const deleteHari = () => {
    Swal.fire({
      text: "Hapus Hari?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            "http://localhost:3050/hari/" +
              idHari,
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


  const hariUpdate = () => {
    localStorage.setItem("idHari", idHari);
    if (!localStorage.idHari) {
      localStorage.setItem("idHari", idHari);
    } else {
      navigate("/hari/update");
    }
  };

  useEffect(() => {
    fetchTanggal();
  }, []);
  console.log(idHari);

  return (
    <div className="container-fluid table-responsive-sm">
      <div>
        <Link to="/hari/add" className="btn btn-sm btn-outline-dark my-3">Tambah Data +</Link>
      </div>
      <table className="table">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Hari</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataHari.map((Hari, index) => {
            return (
              <tr key={Hari.id}>
                <td>{index + 1}</td>
                <td>{Hari.hari}</td>
                <td>
                  {/* <button
                    className="btn btn-sm m-1 btn-outline-danger me-4"
                    onFocus={() => {
                      setIdHari(Hari.id);
                    }}
                    onClick={() => {
                      hariUpdate();
                    }}
                  >
                    <BsFillPencilFill/>
                  </button> */}
                  {/* <button
                    className="btn btn-sm m-1 btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdHari(Hari.id);
                    }}
                    onClick={(e) => deleteHari(e.preventDefault())}
                  >
                    <BsFillTrash3Fill/>
                  </button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HariTable;
