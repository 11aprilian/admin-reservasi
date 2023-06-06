import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/layouts/Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const RegisterAdmin = async () => {
    let regis = {
        username: username,
        password: password,
      };
    try {
        const user = await axios.post(
          "http://localhost:3050/admin/register",
          regis,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(user.data);
        navigate("/login");
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      }
  };

  const RegisterHandle = async () => {
    RegisterAdmin();
  };

  const RegisterFailed = () => {
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
            onClick={(e) => RegisterHandle(e.preventDefault())}
          >
            Register
          </button>
        </form>
        <div className="mt-2">
          <Link to="/login" className="text-decoration-none mt-2 text-danger">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
