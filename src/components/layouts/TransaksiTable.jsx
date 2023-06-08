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
      <table className="table">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">ID Transaksi</th>
            <th scope="col">Nama</th>
            <th scope="col">Bank</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataTransaksi.map((transaksi) => {
            return (
              <tr key={transaksi.id}>
                <td>{transaksi.id}</td>
                <td>{transaksi.nama}</td>
                <td>{transaksi.bank}</td>
                <td><Link to={`/transaksi/detail/${transaksi.id}`} className="btn btn-sm m-1 btn-outline-danger"
                ><BsInfoCircle/></Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransaksiTable;
