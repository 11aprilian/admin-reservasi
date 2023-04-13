import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/layouts/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {   
      let admin = await fetch(
        "https://backend-reservasi-production.up.railway.app/admin/login",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );

      admin = await admin.json();
      const adminID = admin.id;
      const adminUser = admin.username;
      console.log(admin);
      if (admin.token) {
        localStorage.setItem("adminToken", admin.token);
        try {
          localStorage.setItem("adminId", JSON.stringify(adminID));
          localStorage.setItem("adminUser", JSON.stringify(adminUser));
        } catch (error) {
          loginFailed();
        }
        await Swal.fire({
          text: admin.message,
          icon: "success",
        });
        navigate("/");
      } else {
        throw "Gagal Login!";
      }
    } catch (error) {
      console.log(error);
      loginFailed();
    }
  };

  const LoginHandle = async () => {
    loginAdmin();
  };

  const loginFailed = () => {
    Swal.fire({
      icon: "error",
      text: "Periksa Username atau Password anda kembali!",
    });
  };

  return (
    <div>
      <div className="container my-2">
        <h1 className="fw-bold">Admin Dashboard</h1>
      </div>
      <div className="container my-3">
        <form>
          <div className="form-group">
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              id="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Masukkan Username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Masukkan Password"
            />
          </div>

          <button
            type="submit"
            className="btn mt-2 btn-outline-danger"
            onClick={(e) => LoginHandle(e.preventDefault())}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
