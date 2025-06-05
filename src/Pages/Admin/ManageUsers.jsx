import React, { useEffect, useState } from "react";
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { NavLink } from "react-router-dom"; 
import Loader from "../../components/utilities/Loader/Loader";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ search: "" });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null); 

  const handleFilterChange = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const fetchUsers = () => {
    setLoading(true);
    const users = [
      { id: 1, name: "John Doe", email: "john.doe@example.com", invitation_code: "JOHNDOE123", status: "active" },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", invitation_code: "JANESMITH456", status: "deactivated" },
      { id: 3, name: "Peter Jones", email: "peter.jones@example.com", invitation_code: "PETERJONES789", status: "active" },
      { id: 4, name: "Mary Brown", email: "mary.brown@example.com", invitation_code: "MARYBROWN101", status: "active" },
      { id: 5, name: "David Green", email: "david.green@example.com", invitation_code: "DAVIDGREEN102", status: "deactivated" },
      { id: 6, name: "Lisa White", email: "lisa.white@example.com", invitation_code: "LISAWHITE103", status: "active" },
      { id: 7, name: "James Black", email: "james.black@example.com", invitation_code: "JAMESBLACK104", status: "active" },
      { id: 8, name: "Patricia Blue", email: "patricia.blue@example.com", invitation_code: "PATRICIABLUE105", status: "deactivated" },
    ];

    setTimeout(() => {
      setUsers(users);
      setPageCount(2); 
      setLoading(false);
    }, 500);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const toggleStatus = (id, currentStatus) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id
          ? { ...user, status: currentStatus === "active" ? "deactivated" : "active" }
          : user
      )
    );
    toast.success("User status updated locally");
  };

  const openProfileModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); 
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filter]);

  return (
    <div className="container mt-4">
      <h3>Manage Users</h3>

      <div className="col-md-4 mb-3">
        <input
          type="text"
          className="form-control"
          name="search"
          placeholder="Search by name, email, or ID"
          value={filter.search}
          onChange={handleFilterChange}
        />
      </div>

      <div className="table-responsive">
        {loading ? (
          <Loader />
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Invitation Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.invitation_code}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 rounded-pill ${
                          user.status === "active"
                            ? "bg-success text-white"
                            : "bg-danger text-white"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-light"
                          type="button"
                          id={`dropdownMenuButton${user.id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton${user.id}`}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => toggleStatus(user.id, user.status)}
                            >
                              {user.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>
                          </li>
                          <li>
                           
                            <button
                              className="dropdown-item"
                              onClick={() => openProfileModal(user)}
                            >
                              Profile
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {users.length > 0 && (
        <div className="d-flex justify-content-end mt-3">
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </div>
      )}

{isModalOpen && selectedUser && (
  <div
    className="modal fade show"
    style={{
      display: "flex",
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
    }}
    tabIndex="-1"
    role="dialog"
    aria-labelledby="userProfileModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="userProfileModalLabel">
            User Profile
          </h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeProfileModal}
          ></button>
        </div>

        <div className="modal-body">
        <div className="card p-3 mb-3">
          <div className="d-flex align-items-center gap-3">
         <img
      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}&background=random`}
      alt="avatar"
      className="rounded-circle"
      width="60"
      height="60"
    />
    <div>
      <p className="mb-1"><strong>Name:</strong> {selectedUser.name}</p>
      <p className="mb-1"><strong>ID:</strong> {selectedUser.id}</p>
      <p className="mb-0"><strong>Email:</strong> {selectedUser.email}</p>
    </div>
  </div>
</div>


          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card text-center p-3 h-100">
                <h6>Total Messages Sent</h6>
                <h3 className="text-primary">20</h3>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card text-center p-3 h-100">
                <h6>Available Credit</h6>
                <h3 className="text-success">20</h3>
              </div>
            </div>
          </div>


          <div className="table-responsive">
            <h6 className="mb-3">Message History</h6>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Recipient</th>
                  <th>Total Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hello Esther, your OTP is 1234.</td>
                  <td>+2348012345678</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Welcome onboard! Your access is now active.</td>
                  <td>+2348012345679</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeProfileModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ManageUsers