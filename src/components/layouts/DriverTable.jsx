import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const DriverTable = () => {
  const [dataDriver, setDataDriver] = useState([]);
  const [idDriver, setIdDriver] = useState("");

  const fetchDriver = () => {
    axios
      .get("http://localhost:3050/driver")
      .then((result) => {
        const responseAPI = result.data;
        setDataDriver(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDriver();
  }, []);
  console.log(idDriver);
  localStorage.setItem("idDriver", idDriver)

  return (
    <div className="container-fluid table-responsive-sm mt-3">
      <table className="table">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nama Driver</th>
            <th scope="col">Didaftarkan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataDriver.map((driver) => {
            return (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.nama}</td>
                <td>{driver.createdAt}</td>
                <td>
                <Link
                to={`/driver/option/${driver.id}`}
                    className="btn btn-sm m-1 btn-outline-primary me-4"
                  >
                    Atur Jadwal
                  </Link>
                  <button
                    className="btn btn-sm m-1 btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdDriver(driver.id);
                    }}
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

export default DriverTable;
