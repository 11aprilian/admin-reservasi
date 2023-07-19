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
    <div className="container-fluid table-responsive-sm">
      <div>
        <Link to="/driver/add" className="btn btn-sm btn-outline-dark my-3">
          Tambah Data +
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Driver</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataDriver.map((driver, index) => {
            return (
              <tr key={driver.id}>
                <td>{index + 1}</td>
                <td>{driver.nama}</td>
                <td>
                {/* <Link
                to={`/driver/option/${driver.id}`}
                    className="btn btn-sm m-1 btn-outline-primary me-4"
                  >
                    Atur Jadwal
                  </Link> */}
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
