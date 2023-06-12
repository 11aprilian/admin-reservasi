import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdPerson, MdTask } from "react-icons/md";
import { Link } from "react-router-dom";

const ContentRow = () => {
  const [totalUser, setTotalUser] = useState();

  const fetchUser = () => {
    axios
      .get("http://localhost:3050/user")
      .then((result) => {
        const responseAPI = result.data.data;

        setTotalUser(responseAPI.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser();
  });
  return (
    <div>
      <div className="row m-3 p-2">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="fw-bolder font-weight-bold text-danger text-uppercase mb-1">
                    PENGGUNA TERDAFTAR
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">
                    <small>{totalUser}</small>
                  </div>
                </div>
                <div className="col-auto">
                  <MdPerson className="text-secondary" size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-9 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="fw-bolder font-weight-bold text-primary text-uppercase mb-1">
                    ADMIN TASKS
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">
                    <p>
                      <small>
                        Mengatur Rute, dan Jadwal Berangkat.
                      </small>
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <MdTask className="text-secondary" size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-3 p-2">
        <div className="col-xl-12 col-md-6 mb-4">
          <div className="card shadow h-100 p-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="fw-bolder font-weight-bold text-primary text-uppercase mb-1">
                    ADVANCED ADMIN TASKS
                  </div>
                  <div className="h5 mb-0 my-2 font-weight-bold text-secondary">
                    <ul className="list-group">
                      <li className="list-group-item small text-secondary">
                        Menambahkan driver atau mengganti driver pada {" "}
                        <span>
                          <Link
                            to={"/jadwal"}
                            className="text-decoration-none"
                          >
                            Jadwal
                          </Link>
                        </span>
                      </li>
                      {/* <li className="list-group-item small text-secondary">
                        Menentukan jadwal keberangkatan yang akan digunakan
                        driver pada menu{" "}
                        <span>
                          <Link to={"/driver"} className="text-decoration-none">
                            Driver
                          </Link>
                        </span>
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div className="col-auto">
                  <MdTask className="text-secondary" size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
