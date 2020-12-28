import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";

const ShowProfile = ({ setAuth }) => {
  setAuth(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usid, setId] = useState("");
  const [userChange, setUserChange] = useState(false);
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();

      setName(parseData[0].user_name);
      setEmail(parseData[0].user_email);
      setId(parseData[0].user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setUserChange(false);
  }, [userChange]);

  return (
    <div className="jumbotron mt-5 ">
      <h2 class="text-primary bg-warning">User Profile Info</h2>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr key={usid}>
            <td>{name}</td>
            <td>{email}</td>
            <td>
              <EditProfile
                userId={usid}
                name={name}
                email={email}
                setUserChange={setUserChange}
              />
            </td>
            {/* <td>
              <button className="btn btn-warning" onClick={() => {}}>
                Edit
              </button>
            </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowProfile;
