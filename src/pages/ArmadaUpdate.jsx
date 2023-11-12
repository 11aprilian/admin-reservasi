import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import Verifikasi from "../components/layouts/Verifikasi";

const ArmadaUpdate = () => {
  const [armada, setArmada] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [urlGambar, setUrlGambar] = useState("");

  const [idSeat, setIdSeat] = useState("");
  const [nomorSeat, setNomorSeat] = useState("");

  const [dataSeat, setDataSeat] = useState([""]);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchArmadaById = () => {
    axios.get("http://localhost:3050/armada/" + id).then((result) => {
      const responseAPI = result.data.data;
      setArmada(responseAPI.nama);
      setKeterangan(responseAPI.keterangan);
      setUrlGambar(responseAPI.gambar);
    });
  };

  const fetchSeat = () => {
    axios.get("http://localhost:3050/seat/armada/" + id).then((result) => {
      const responseAPI = result.data.data;
      setDataSeat(responseAPI);
    });
  };

  const updateArmada = () => {
    let data = {
      nama: armada,
      keterangan: keterangan,
      gambar: urlGambar
    };

    Swal.fire({
      text: "Update Armada?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("http://localhost:3050/armada/" + id, data, {
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
            navigate("/armada");
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

  const deleteSeat = () => {
    Swal.fire({
      text: "Hapus Seat?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:3050/seat/" + idSeat, {
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

  const addSeat = async () => {
    if (nomorSeat === "" || id === "") {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else {
      let data = {
        nomor: nomorSeat,
        ArmadaId: id,
      };

      try {
        axios
          .post(
            "http://localhost:3050/seat",
            data,
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
                text: "Data Berhasil Disimpan!",
                icon: "success",
                showConfirmButton: true,
              });
              navigate(`/armada/update/${id}`)
          })
          .catch(() => {
            Swal.fire({
                text : "Anda Tidak Memiliki Akses!",
                icon : "error"
            })
          })
      } catch (error) {
        console.log(error);
        Swal.fire({
          text: "Gagal Menambahkan Data!",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchArmadaById();
    fetchSeat();
  }, []);
  console.log(idSeat);

  return (
    <div>
      <Navbar />
      <Verifikasi />
      <div className="container m-3">
        <form>
          <div className="form-group">
            <label>ID Armada</label>
            <input
              type="text"
              className="bg-light form-control"
              id="idJadwal"
              value={id}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Nama Armada</label>
            <input
              type="text"
              className="form-control"
              id="armada"
              value={armada}
              onChange={(e) => {
                setArmada(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Keterangan Armada</label>
            <input
              type="text"
              className="form-control"
              id="armada"
              value={keterangan}
              onChange={(e) => {
                setKeterangan(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>URL Gambar</label>
            <input
              type="text"
              className="form-control"
              id="armada"
              value={urlGambar}
              onChange={(e) => {
                setUrlGambar(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => updateArmada(e.preventDefault())}
          >
            <BsFillPencilFill />
          </button>
        </form>

        <div className="mt-3 table-sm">
          <h4 className="fw-bolder">Seat Armada</h4>

          <form className="row">
            <div className="mt-2 form-group col-md-4">
              <input
                type="text"
                className="form-control"
                id="armada"
                placeholder="Masukkan Nomor Seat"
                onChange={(e) => {
                  setNomorSeat(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="mt-2 btn btn-outline-danger col-md-2"
              onClick={(e) => addSeat(e.preventDefault())}
            >
              Tambah Seat
            </button>
          </form>

          <table className="mt-2 table table-striped table-bordered">
            <thead className="thead-dark bg-dark text-white">
              <tr>
                <th scope="col">Nomor Seat</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataSeat.map((seat) => {
                return (
                  <tr key={seat.id}>
                    <td>{seat.nomor}</td>
                    <td>
                      <button
                        className="btn m-1 btn-sm btn-outline-secondary"
                        onMouseEnter={() => {
                          setIdSeat(seat.id);
                        }}
                        onClick={(e) => deleteSeat(e.preventDefault())}
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

export default ArmadaUpdate;
