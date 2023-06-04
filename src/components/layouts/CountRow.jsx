import React, { useEffect, useState } from "react";
import { MdArticle, MdDirections, MdCalendarMonth, MdOutlinePersonPin } from "react-icons/md";
import axios from "axios";

const CountRow = () => {
  const [totalTransaksi, setTotalTransaksi] = useState("0");
  const [totalRute, setTotalRute] = useState("0");
  const [totalJadwal, setTotalJadwal] = useState("0");
  const [totalDriver, setTotalDriver] = useState("0");

  const fetchTransaksi = () => {
    axios
      .get("http://localhost:3050/transaksi")
      .then((result) => {
        const responseAPI = result.data.data;

        setTotalTransaksi(responseAPI.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRute = () => {
    axios
      .get("http://localhost:3050/rute")
      .then((result) => {
        const responseAPI = result.data.data;

        setTotalRute(responseAPI.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchJadwal = () => {
    axios
      .get("http://localhost:3050/jadwaldriver")
      .then((result) => {
        const responseAPI = result.data.data;

        setTotalJadwal(responseAPI.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDriver = () => {
    axios
      .get("http://localhost:3050/driver")
      .then((result) => {
        const responseAPI = result.data.data;

        setTotalDriver(responseAPI.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTransaksi();
    fetchRute();
    fetchJadwal();
    fetchDriver();
  }, []);
  return (
    <div>
      <div className="row m-3 p-2">
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="fw-bolder font-weight-bold text-danger text-uppercase mb-1">
                    TRANSAKSI
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">
                    <small>{totalTransaksi}</small>
                  </div>
                </div>
                <div className="col-auto">
                  <MdArticle className="text-secondary" size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="fw-bolder font-weight-bold text-success text-uppercase mb-1">
                    RUTE
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">
                    <small>{totalRute}</small>
                  </div>
                </div>
                <div className="col-auto">
                  <MdDirections className="text-secondary" size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="fw-bolder font-weight-bold text-warning text-uppercase mb-1">
                    JADWAL DIATUR
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">
                    <small>{totalJadwal}</small>
                  </div>
                </div>
                <div className="col-auto">
                  <MdCalendarMonth className="text-secondary" size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="fw-bolder font-weight-bold text-primary text-uppercase mb-1">
                    DRIVER
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">
                    <small>{totalDriver}</small>
                  </div>
                </div>
                <div className="col-auto">
                  <MdOutlinePersonPin className="text-secondary" size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountRow;
