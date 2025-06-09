import React, { useEffect, useState } from "react";
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { NavLink } from "react-router-dom";
import Loader from "../../components/utilities/Loader/Loader";
import "./ManageUsers.css";

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
    const allUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        invitation_code: "JOHNDOE123",
        status: "active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        invitation_code: "JANESMITH456",
        status: "deactivated",
      },
      {
        id: 3,
        name: "Peter Jones",
        email: "peter.jones@example.com",
        invitation_code: "PETERJONES789",
        status: "active",
      },
      {
        id: 4,
        name: "Mary Brown",
        email: "mary.brown@example.com",
        invitation_code: "MARYBROWN101",
        status: "active",
      },
      {
        id: 5,
        name: "David Green",
        email: "david.green@example.com",
        invitation_code: "DAVIDGREEN102",
        status: "deactivated",
      },
      {
        id: 6,
        name: "Lisa White",
        email: "lisa.white@example.com",
        invitation_code: "LISAWHITE103",
        status: "active",
      },
      {
        id: 7,
        name: "James Black",
        email: "james.black@example.com",
        invitation_code: "JAMESBLACK104",
        status: "active",
      },
      {
        id: 8,
        name: "Patricia Blue",
        email: "patricia.blue@example.com",
        invitation_code: "PATRICIABLUE105",
        status: "deactivated",
      },
    ];

    const searchTerm = filter.search.toLowerCase();

    const filteredUsers = searchTerm
      ? allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.invitation_code.toLowerCase().includes(searchTerm) ||
            user.id.toString().includes(searchTerm)
        ) 
      : allUsers;

    setTimeout(() => {
      setUsers(filteredUsers);
      setPageCount(Math.ceil(filteredUsers.length / 10) || 1);
      setLoading(false);
    }, 500);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const toggleStatus = (id, currentStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: currentStatus === "active" ? "deactivated" : "active",
            }
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
          <table className="table outer-bordered-table">
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
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      )}

      {isModalOpen && selectedUser && (
        <div
          className="modal custom-modal-wrapper"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="userProfileModalLabel"
          aria-hidden="true"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header border-0 position-relative shadow-sm">
                <h5>User Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeProfileModal}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <div
                          className="avatar-circle bg-light text-mutted d-flex align-items-center justify-content-center"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            fontSize: "24px",
                            fontWeight: "bold",
                          }}
                        >
                          {selectedUser.name
                            ? selectedUser.name.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                      </div>
                      <div className="col">
                        <p className="mb-1 text-muted">
                          <b>Name: </b>
                          {selectedUser.name || "User Name"}
                        </p>
                        <p className="text-muted mb-1">
                          <b> Email: </b>
                          {selectedUser.email || "user@example.com"}
                        </p>
                        <p className="text-muted mb-0">
                          <b>ID:</b>
                          {selectedUser.id || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div
                      className="card shadow-sm w-100"
                      style={{
                        backgroundColor: "#E6F0FE",
                      }}
                    >
                      <div className="card-body d-flex align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center rounded-circle text-white flex-shrink-0"
                          style={{
                            backgroundColor: "#0d6efd",
                            width: "50px",
                            height: "50px",
                            fontSize: "1.5rem",
                          }}
                        >
                          <i className="fas fa-paper-plane"></i>
                        </div>
                        <div
                          className="ms-3 text-start"
                          style={{ flex: 1, minWidth: "120px" }}
                        >
                          <h3 className="mb-1 text-primary">
                            {selectedUser.totalMessagesSent || 0}
                          </h3>
                          <p
                            className="mb-0 text-muted"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Total Messages
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className="card shadow-sm w-100 credit"
                      style={{
                        backgroundColor: "#E8FAF2",
                      }}
                    >
                      <div className="card-body d-flex align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center rounded-circle text-white flex-shrink-0"
                          style={{
                            backgroundColor: "#198754",
                            width: "50px",
                            height: "50px",
                            fontSize: "1.5rem",
                          }}
                        >
                          <i className="fas fa-coins"></i>
                        </div>
                        <div
                          className="ms-3 text-start"
                          style={{ flex: 1, minWidth: "120px" }}
                        >
                          <h3 className="mb-1 text-success">
                            {selectedUser.availableCredit || 0}
                          </h3>
                          <p
                            className="mb-0 text-muted"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            Available Credits
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="mb-2">
                  <i className="fas fa-history me-2"></i>
                  Message History
                </h5>
                <div className="card shadow-sm">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Message</th>
                            <th scope="col">Recipient</th>
                            <th scope="col">Credits Used</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedUser.messageHistory &&
                          selectedUser.messageHistory.length > 0 ? (
                            selectedUser.messageHistory.map(
                              (message, index) => (
                                <tr key={index}>
                                  <td>{message.id || index + 1}</td>
                                  <td>
                                    <div
                                      className="text-truncate"
                                      style={{ maxWidth: "200px" }}
                                    >
                                      {message.content || "No message content"}
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-dark">
                                      {message.recipient || "Unknown"}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge bg-primary">
                                      {message.creditsUsed || 0}
                                    </span>
                                  </td>
                                  <td className="text-muted">
                                    {message.date
                                      ? new Date(
                                          message.date
                                        ).toLocaleDateString()
                                      : "N/A"}
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center text-muted py-4"
                              >
                                No message history available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-primary"
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

export default ManageUsers;
