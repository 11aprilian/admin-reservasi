import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const UserTable = () => {
  const [dataUser, setDataUser] = useState([]);
  const [idUser, setIdUser] = useState("");

  const fetchUser = () => {
    axios
      .get("http://localhost:3050/user")
      .then((result) => {
        const responseAPI = result.data;
        setDataUser(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log(idUser);
  localStorage.setItem("idUser", idUser)

  return (
    <div className="container-fluid table-responsive-sm mt-3">
      <table className="table">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button
                    className="btn btn-sm m-1 btn-outline-secondary"
                    onMouseEnter={() => {
                      setIdUser(user.id);
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

export default UserTable;
