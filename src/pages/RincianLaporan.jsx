import Navbar from "../components/layouts/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RincianLaporan = () => {
  const [tglAwal, setTglAwal] = useState("2023-01-01");
  const [tglAkhir, setTglAkhir] = useState(() => {
    const tgl = new Date();
    var current = new Date(tgl);
    current.setDate(tgl.getDate() + 1);
    return current.toISOString().split('T')[0]
  });

  const [selected, setSelected] = useState("");

  const [dataLaporan, setDataLaporan] = useState([]);

  const [totalPendapatan, setTotalPendapatan] = useState("");

  const fetchLaporan = () => {
    axios
      .get(
        "http://localhost:3050/transaksi/report/all/" +
          tglAwal +
          "/" +
          tglAkhir
      )
      .then((result) => {
        const responseAPI = result.data;
        const totalHarga = responseAPI.data.reduce(
          (totalAll, transaksi) => totalAll + transaksi.total,
          0
        );

        setDataLaporan(responseAPI.data);
        setTotalPendapatan(totalHarga);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStartDate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setTglAwal(formattedDate);
    setSelected(date);
  };

  const handleEndDate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setTglAkhir(formattedDate);
  };

  const downloadPdf = () => {
    const input = document.getElementById("table-to-print");

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("l", "pt", "a4");
      const today = new Date();
      const dateString = today.toLocaleDateString();

      pdf.setFont("Times New Roman");

      pdf.setPage(1);

      pdf.text(
        "Laju Jaya Tour & Travel",
        pdf.internal.pageSize.getWidth() / 2,
        20,
        { align: "center" }
      );
      pdf.text(
        "Laporan Data Transaksi Driver",
        pdf.internal.pageSize.getWidth() / 2,
        40,
        { align: "center" }
      );
      pdf.text(
        "RT.01/RW.03 Desa Tapan Kec. Kedungwaru, Kab. Tulungagung Jawa Timur 66229",
        pdf.internal.pageSize.getWidth() / 2,
        55,
        { align: "center" },
        pdf.setFontSize(12)
      );

      pdf.setLineWidth(1);
      pdf.line(20, 65, 820, 65);
      pdf.text(`Tanggal : ${dateString}`, 20, 85, pdf.setFontSize(12));
      pdf.text(
        `Data       : Rincian Laporan ${tglAwal} / ${tglAkhir}`,
        20,
        105,
        pdf.setFontSize(12)
      );

      pdf.text(
        `Total Pendapatan : Rp. ${totalPendapatan}`,
        670,
        105,
        pdf.setFontSize(12)
      );

      const tableY = 125;

      pdf.autoTable({
        html: "#table-to-print",
        startY: tableY,
        theme: "grid", // Set the table theme to grid for visible borders
        styles: {
        textColor: "#000000",
        fillColor: "#FFFFFF", // Set the background color of cells to transparent
        lineColor: "#000000", // Set the border color to black
        lineWidth: 0.1,
        fontSize: 9 // Set the border width
        }
      });

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  };

  useEffect(() => {
    fetchLaporan();
  }, []);
  console.log(totalPendapatan);
  return (
    <div>
      <Navbar />
      <div className="container-fluid table-responsive-sm mt-3">
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <label className="small form-label">Tanggal Awal :</label>
          <DatePicker
            className="form-control"
            value={tglAwal}
            onChange={handleStartDate}
          />
        </div>
        <div className="col-md-4 mb-2">
          <label className="small form-label">Tanggal Akhir :</label>
          <div className="d-flex">
            <DatePicker
              className="form-control"
              value={tglAkhir}
              minDate={selected}
              onChange={handleEndDate}
            />
            <button
              className="btn btn-outline-danger ms-4"
              onClick={fetchLaporan}
            >
              Filter
            </button>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <label className="small form-label">Total Pendapatan :</label>
          <div className="d-flex">
            <input
              className="form-control"
              placeholder={"Rp. " + totalPendapatan}
              disabled
            />
            <button
              className="btn btn-outline-danger ms-4"
              onClick={downloadPdf}
            >
              Cetak
            </button>
          </div>
        </div>
      </div>
        <table
          className="table small table-striped table-bordered"
          id="table-to-print"
        >
          <thead className="thead-dark bg-dark text-white">
            <tr>
              <th scope="col">No</th>
              <th scope="col">ID</th>
              <th scope="col">Nama Driver</th>
              <th scope="col">Nama Pelanggan</th>
              <th scope="col">Nama Penumpang</th>
              <th scope="col">Alamat</th>
              <th scope="col">No Hp</th>
              <th scope="col">Rute</th>
              <th scope="col">Waktu Transaksi</th>
              <th scope="col">Waktu Travel</th>
              <th scope="col">Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            {dataLaporan.map((transaksi, index) => {
              return (
                <tr key={transaksi.id}>
                  <td>{index + 1}</td>
                  <td>{transaksi.id}</td>
                  <td>{transaksi.Jadwal_driver.Driver.nama}</td>
                  <td>{transaksi.User.username}</td>
                  <td>{transaksi.nama}</td>
                  <td>{transaksi.alamat}</td>
                  <td>{transaksi.no_hp}</td>
                  <td>{transaksi.Jadwal_driver.Rute.arah}</td>
                  <td>{transaksi.updatedAt.slice(0, 10)}</td>
                  <td>
                    {transaksi.tanggal}
                    {", "}
                    {transaksi.Jadwal_driver.Jam.jam}
                  </td>
                  <td>
                    {"Rp. "}
                    {transaksi.total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RincianLaporan;
