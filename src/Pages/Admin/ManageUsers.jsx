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
          className="modal fade show"
          style={{
            display: "flex",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="userProfileModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header border-0 position-relative">
                <h5>User Profile</h5>

                <button
                  type="button"
                  className="btn-close btn-close-black position-absolute"
                  style={{ top: "1rem", right: "1rem" }}
                  aria-label="Close"
                  onClick={closeProfileModal}
                ></button>
              </div>

              <div className="modal-body p-0">
                <div className="p-4 bg-light">
                  <div
                    className="card  border-0 mb-4"
                    style={{
                      borderRadius: "12px",
                      // background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      // border: "1px solid #dee2e6"
                    }}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex align-items-start gap-4">
                        {/* Avatar */}
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            selectedUser.name
                          )}&background=667eea&color=ffffff&size=80&bold=true`}
                          alt="User Avatar"
                          className="rounded-circle shadow-sm"
                          width="80"
                          height="80"
                          style={{ border: "3px solid #667eea" }}
                        />

                        <div className="d-flex flex-column gap-2">
                          <div className="d-flex align-items-center">
                            <small className="text-muted fw-semibold me-2">
                              Full Name:
                            </small>
                            <span className="fw-bold text-dark">
                              {selectedUser.name}
                            </span>
                          </div>

                          <div className="d-flex align-items-center">
                            <small className="text-muted fw-semibold me-2">
                              User ID:
                            </small>
                            <span className="fw-bold text-dark">
                              {selectedUser.id}
                            </span>
                          </div>

                          <div className="d-flex align-items-center">
                            <small className="text-muted fw-semibold me-2">
                              Email:
                            </small>
                            <span className="fw-bold text-dark">
                              {selectedUser.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">

                    <div className="col-md-6">
                      <div
                        className="card border-0 h-100 px-3 py-3 "
                        style={{
                          borderRadius: "12px",
                          backgroundColor: "#D6E8FF",
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle"
                            style={{
                              backgroundColor: "#116FFD",
                              width: "50px",
                              height: "50px",
                            }}
                          >
                            <i className="fas fa-paper-plane text-white"></i>
                          </div>
                          <div>
                            <h4 className="fw-bold mb-0 text-dark">20</h4>
                            <small className="text-muted">Messages Sent</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="card border-0 h-100 px-3 py-3"
                        style={{
                          borderRadius: "12px",
                          backgroundColor: "#e8fbee",
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle"
                            style={{
                              backgroundColor: "#38ef7d",
                              width: "50px",
                              height: "50px",
                            }}
                          >
                            <i className="fas fa-coins text-white"></i>
                          </div>
                          <div>
                            <h4 className="fw-bold mb-0 text-dark">20</h4>
                            <small className="text-muted">
                              Available Credits
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 fw-bold text-dark">
                      <i className="fas fa-history me-2 text-primary"></i>
                      Message History
                    </h5>
                    <span className="badge bg-primary rounded-pill">
                      2 messages
                    </span>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                          <th className="border-0 fw-semibold text-muted py-3">
                            Message
                          </th>
                          <th className="border-0 fw-semibold text-muted py-3">
                            Recipient
                          </th>
                          <th className="border-0 fw-semibold text-muted py-3 text-center">
                            Credits
                            Used
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-bottom">
                          <td className="py-3">
                            <div className="d-flex align-items-start">
                              <div>
                                <p className="mb-1 fw-medium">
                                  Hello Esther, your OTP is 1234.
                                </p>
                                <small className="text-muted">
                                  <i className="fas fa-clock me-1"></i>2 hours
                                  ago
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <span className="fw-medium">+2348012345678</span>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2"
                              style={{ fontSize: "0.875rem" }}
                            >
                              1 credit
                            </span>
                          </td>
                        </tr>
                        <tr className="border-bottom">
                          <td className="py-3">
                            <div className="d-flex align-items-start">
                              <div>
                                <p className="mb-1 fw-medium">
                                  Welcome onboard! Your access .
                                </p>
                                <small className="text-muted">
                                  <i className="fas fa-clock me-1"></i>1 day ago
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <span className="fw-medium">+2348012345679</span>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-2"
                              style={{ fontSize: "0.875rem" }}
                            >
                              2 credits
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div
                className="modal-footer border-0 bg-light"
                style={{ padding: "1.5rem 2rem" }}
              >
                <div className="d-flex gap-3 ms-auto">
                  <button
                    type="button"
                    className="btn btn-light border px-4 py-2"
                    style={{ borderRadius: "8px" }}
                    onClick={closeProfileModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary px-4 py-2"
                    style={{
                      borderRadius: "8px",
                      background:
                        "#116FFD",
                      border: "none",
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
