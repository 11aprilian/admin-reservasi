import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RekapTable = () => {
  const [dataRekap, setDataRekap] = useState([]);

  const [tglMulai, setTglMulai] = useState("");
  const [tglSelesai, setTglSelesai] = useState("");
  const [selected, setSelected] = useState("");

  const [totalPendapatan, setTotalPendapatan] = useState("");

  const navigate = useNavigate();

  const fetchRekap = () => {
    axios
      .get(
        "http://localhost:3050/transaksi/rekap/" + tglMulai + "/" + tglSelesai
      )
      .then((result) => {
        const responseAPI = result.data;
        const totalHarga = responseAPI.data.reduce(
          (totalAll, transaksi) =>
            totalAll + parseInt(transaksi.total_pendapatan),
          0
        );

        setDataRekap(responseAPI.data);
        setTotalPendapatan(totalHarga);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStartDate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setTglMulai(formattedDate);
    setSelected(date);
  };

  const handleEndDate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setTglSelesai(formattedDate);
  };

  const downloadPdf = () => {
    const input = document.getElementById("table-to-print");

    html2canvas(input).then(() => {
      const pdf = new jsPDF();
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
        "Laporan Data Rekap Transaksi",
        pdf.internal.pageSize.getWidth() / 2,
        27,
        { align: "center" }
      );
      pdf.text(
        "RT.01/RW.03 Desa Tapan Kec. Kedungwaru, Kab. Tulungagung Jawa Timur 66229",
        pdf.internal.pageSize.getWidth() / 2,
        34,
        { align: "center" },
        pdf.setFontSize(12)
      );

      pdf.setLineWidth(1);
      pdf.line(20, 38, 190, 38);
      pdf.text(`Tanggal : ${dateString}`, 15, 48, pdf.setFontSize(12));
      pdf.text(
        `Data       : Rekap Travel ${tglMulai} / ${tglSelesai}`,
        15,
        55,
        pdf.setFontSize(12)
      );
      pdf.text(
        `Total Pendapatan : Rp. ${totalPendapatan}`,
        140,
        48,
        pdf.setFontSize(12)
      );

      const tableY = 62;

      const excludeColumns = [5];
      const table = document.getElementById("table-to-print");
      // Exclude columns from the table
      excludeColumns.forEach((colIndex) => {
        const th = table.getElementsByTagName("th")[colIndex];
        const td = table.getElementsByTagName("td")[colIndex];
        th.style.display = "none";
        td.style.display = "none";
      });

      // Generate the table with excluded columns
      pdf.autoTable({
        html: table,
        startY: tableY,
      });

      // Restore the excluded columns
      excludeColumns.forEach((colIndex) => {
        const th = table.getElementsByTagName("th")[colIndex];
        const td = table.getElementsByTagName("td")[colIndex];
        th.style.display = "";
        td.style.display = "";
      });

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  };

  useEffect(() => {}, []);

  console.log("tglMulai", tglMulai);
  console.log("tglSelesai", tglSelesai);
  console.log(dataRekap);
  console.log(totalPendapatan);
  return (
    <div className="container-fluid table-responsive-sm mt-3">
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <label className="small form-label">Tanggal Awal :</label>
          <DatePicker
            className="form-control"
            value={tglMulai}
            onChange={handleStartDate}
          />
        </div>
        <div className="col-md-4 mb-2">
          <label className="small form-label">Tanggal Akhir :</label>
          <div className="d-flex">
            <DatePicker
              className="form-control"
              value={tglSelesai}
              minDate={selected}
              onChange={handleEndDate}
            />
            <button
              className="btn btn-outline-danger ms-4"
              onClick={fetchRekap}
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
      <table className="table" id="table-to-print">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">Tanggal</th>
            <th scope="col">Nama Driver</th>
            <th scope="col">Jumlah Transaksi</th>
            <th scope="col">Jumlah Perjalanan</th>
            <th scope="col">Pendapatan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataRekap.map((transaksi, index) => {
            return (
              <tr key={index}>
                <td>
                  {tglMulai}
                  {" / "}
                  {tglSelesai}
                </td>
                <td>{transaksi.Jadwal_driver.Driver.nama}</td>
                <td>{transaksi.jumlah_transaksi}</td>
                <td>{transaksi.jumlah_perjalanan}</td>
                <td>
                  {"Rp. "}
                  {transaksi.total_pendapatan}
                </td>
                <td>
                  <Link
                    to={`/transaksi/laporan/${transaksi.Jadwal_driver.DriverId}/${tglMulai}/${tglSelesai}`}
                    className="btn btn-sm m-1 btn-outline-primary"
                  >
                    Rincian Laporan
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

export default RekapTable;
