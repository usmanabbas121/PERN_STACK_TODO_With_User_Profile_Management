import React, { Fragment, useState } from "react";

const EditProfile = ({ userId, name, email, setUserChange }) => {
  const [naam, setName] = useState(name);
  const [emal, setEmail] = useState(email);
  //editText function

  const editText = async (id) => {
    try {
      const body = { naam, emal };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      await fetch(`http://localhost:5000/dashboard/users/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setUserChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${userId}`}
      >
        Edit
      </button>
      {/* id = "id21"*/}
      <div className="modal" id={`id${userId}`} onClick={() => setName(naam)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Profile</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setName(naam)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={naam}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-2"
                value={emal}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(userId)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setName(naam)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
