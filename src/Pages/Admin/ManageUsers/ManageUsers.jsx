import React, { useEffect, useState } from "react";
import axiosInstance from "../../../hooks/axiosInstance";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { NavLink } from "react-router-dom";
import Loader from "../../../components/utilities/Loader/Loader";
import "./ManageUsers.css";
import { Modal } from "react-bootstrap";
import UserProfile from "../../../components/Modal/ManageUsers/Profile";
import RechargeCredit from "../../../components/Modal/ManageUsers/RechargeCredit";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ search: "" });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [creditOpen, setCreditOpen] = useState(false)

  const handleFilterChange = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const fetchUsers = () => {
   setLoading(true)
    axiosInstance.post(`/admin/users?page=${page}`, filter)
                .then(res => {
                  setUsers(res.data.data.data)
                  const pageCount = Math.ceil(
                    res.data.data.total / res.data.data.per_page
                  );
                  setPageCount(pageCount);
                })
                .catch(err => {
                    console.log(err.response);
                    toast.error(err.response.data.message)
                })
                .finally(() => setLoading(false))

  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const toggleStatus = (id, currentStatus) => {
    setLoading(true)
    axiosInstance.patch(`/admin/users/change_status/${id}`, {status: currentStatus == 'active' ? 'inactive' : 'active'})
      .then(res => {
        toast.success(res.data.message)
        fetchUsers()
      })
      .catch(err => {
          console.log(err.response);
          toast.error(err.response.data.message)
      })
      .finally(() => setLoading(false))
  };

  const openCreditRechargeModal = (currentUser) => {
    setSelectedUser(currentUser)
    setCreditOpen(true)
  }

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
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header">Manage Users</h3>
      </div>

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
                <th>#</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Invitation Code</th>
                <th>Status</th>
                <th width="5%">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <tr key={user.id}>
                    <td>{i+1}</td>
                    <td>{user.userid}</td>
                    <td>{user.name}</td>
                    <td>{user.email ? user.email : '-'}</td>
                    <td>{user.invite_code ? user.invite_code : '-'}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 rounded-pill text-capitalize ${
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
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => openCreditRechargeModal(user)}
                            >
                              Recharge Sms Credit
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Record Found.
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
              onChange={handlePageChange}
              count={pageCount}
              color="primary"
              // shape="rounded"
              size="small"
              page={page}
          />
        </div>
      )}

      {/* User Profile Modal Modal */}
      {selectedUser && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={isModalOpen}
          onHide={closeProfileModal}
        >
          <Modal.Header closeButton className="bg-light">
            <Modal.Title id="contained-modal-title-vcenter">
              <h5>User Profile</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserProfile 
              selectedUser={selectedUser}
              close={closeProfileModal} 
            />
          </Modal.Body>
        </Modal>
      )}

      {/* Update User sms Credit recharge Modal */}
      {selectedUser && (
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={creditOpen}
          onHide={() => setCreditOpen(false)}
        >
          <Modal.Header closeButton className="bg-light">
            <Modal.Title id="contained-modal-title-vcenter">
              <h5>Recharge SMS credit for <b className="text-uppercase text-info">{selectedUser?.name}</b></h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RechargeCredit 
              selectedUser={selectedUser}
              close={() => setCreditOpen(false)} 
              reload={() => fetchUsers()}
            />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ManageUsers;
