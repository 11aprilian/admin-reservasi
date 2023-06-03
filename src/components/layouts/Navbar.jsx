import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";

const Navbar = () => {
  AOS.init();
  const navigate = useNavigate();
  const LogoutHandle = () => {
    signoutSuccess();
  };
  const signoutSuccess = () => {
    Swal.fire({
      text: "Anda ingin Logout?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "warning",
          text: "Anda telah Logout!",
        }).then(() => {
          navigate("/login");
        });
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminId");
        localStorage.removeItem("idRute");
        localStorage.removeItem("idJadwal");
        localStorage.removeItem("idTrans");
      }
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" data-aos="fade-down">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" height={40} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/transaksi">
                Transaksi
              </Link>
              <Link className="nav-link" to="/rute">
                Rute
              </Link>
              <Link className="nav-link" to="/jam">
                Jam
              </Link>
              <Link className="nav-link" to="/tanggal">
                Tanggal
              </Link>
              <Link className="nav-link" to="/user">
                User
              </Link>
            </div>
            <div className="navbar-nav">
              <button
                className="nav-item btn nav-link bg-transparent"
                onClick={() => LogoutHandle()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
