import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const TransaksiTable = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const navigate = useNavigate();

  const fetchTransaksi = () => {
    axios
      .get("http://localhost:3050/transaksi")
      .then((result) => {
        const responseAPI = result.data;

        setDataTransaksi(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  return (
    <div className="container-fluid table-responsive-sm mt-3">
      <div className="row container">
        <Link to="/transaksi/rekap" className="col-md-2 btn btn-sm btn-outline-primary mb-3 me-2">
          Rekap Transaksi
        </Link>
        <Link to="/transaksi/laporan/all" className="col-md-2 btn btn-sm btn-outline-danger mb-3 me-2">
          Rincian Transaksi
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">No</th>
            <th scope="col">ID Transaksi</th>
            <th scope="col">Nama</th>
            <th scope="col">Bank</th>
            <th scope="col">Status Pembayaran</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataTransaksi.map((transaksi, index) => {
            return (
              <tr key={transaksi.id}>
                <td>{index + 1}</td>
                <td>{transaksi.id}</td>
                <td>{transaksi.nama}</td>
                <td>{transaksi.bank}</td>
                <td>{transaksi.paid.toUpperCase()}</td>
                <td>
                  <Link
                    to={`/transaksi/detail/${transaksi.id}`}
                    className="btn btn-sm m-1 btn-outline-danger"
                  >
                    <BsInfoCircle />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransaksiTable;
