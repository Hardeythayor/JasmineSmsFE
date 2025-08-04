import React, { useEffect, useState } from "react";
import axiosInstance from "../../../hooks/axiosInstance";
import { toast } from "react-toastify";
import Loader from "../../utilities/Loader/Loader";
import useAuth from "../../../hooks/useAuthContext";
import { Pagination } from "@mui/material";
import { Modal } from "react-bootstrap";
import Recipients from "./Recipients";

const UserProfile = ({ close, selectedUser }) => {
    const {userData} = useAuth()
    
    const [loading, setLoading] = useState(false)
    const [userDetail, setUserDetail] = useState(null)
    const [smsReport, setSmsReport] = useState([])
    const [selectedReport, setSelectedReport] = useState(null)
    const [recipientOpen, setRecipientOpen] = useState(false)

    //  state for pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(1);

    //  pagination function
    const handlePageChange = (e, value) => {
        setPage(value);
    };

    const openRecipients = (message) => {
        setSelectedReport(message)
        setRecipientOpen(true)
    }

    const fetchUserProfile = () => {
        setLoading(true)
            axiosInstance.get(`/admin/users/profile/${selectedUser?.id}`)
                .then(res => {
                    setUserDetail(res.data.data)
                })
                .catch(err => {
                    console.log(err.response);
                    toast.error(err.response.data.message)
                })
                .finally(() => setLoading(false))
    };

    const fetchSmsReport = () => {
        setLoading(true)
            axiosInstance.post(`/user/message/report/${selectedUser?.id}?page=${page}`)
                .then(res => {
                  setSmsReport(res.data.data.data)
                  const pageCount = Math.ceil(
                      res.data.data.total / res.data.data.per_page
                  );
                  setPageCount(pageCount);
                })
                .catch(err => {s
                    console.log(err.response);
                    toast.error(err.response.data.message)
                })
                .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchUserProfile()
        fetchSmsReport()
    }, [selectedUser])

  return (
    <div>
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
                <b>Name: </b>&nbsp;
                {selectedUser?.name}
              </p>
              <p className="text-muted mb-1">
                <b> Email: </b>&nbsp;
                {selectedUser.email ? selectedUser.email : '-'}
              </p>
              <p className="text-muted mb-0">
                <b>ID:</b>&nbsp;
                {selectedUser?.userid}
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
                  {Number(userDetail?.messages_count)}
                </h3>
                <p className="mb-0 text-muted" style={{ whiteSpace: "nowrap" }}>
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
                  {Number(userDetail?.sms_credit?.credit_balance).toLocaleString()} krw
                </h3>
                <p className="mb-0 text-muted" style={{ whiteSpace: "nowrap" }}>
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
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {smsReport?.length > 0 ? (
                  smsReport.map((message, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div
                          className="text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {message.content || "-"}
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">
                          {message.recipient_count || "-"} &nbsp;
                          <i 
                            className="mdi mdi-eye text-primary" style={{cursor: 'pointer'}}
                            onClick={() => openRecipients(message)}
                          ></i>
                        </span>
                      </td>
                      <td>
                        <span>
                          {Number(message.recipient_count * userData?.smsCharge) || 0} krw
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${message.status == 'success' ? 'bg-success' : 'bg-danger'}`}>
                          {message.status == 'success' ? 'Completed' : 'Incomplete'}
                        </span>
                      </td>
                      <td className="text-muted">
                        {message.created_at || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No message history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {smsReport.length > 0 && 
                <div className="col-sm-12 d-flex justify-content-end my-4">
                    <Pagination
                        onChange={handlePageChange}
                        count={pageCount}
                        color="primary"
                        // shape="rounded"
                        size="small"
                        page={page}
                    />
                </div>
            }
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div class="hstack gap-2 justify-content-end">
          <button type="button" className="btn btn-light" onClick={close}>
            Close
          </button>
          {/* <button type="submit" className="btn btn-success" id="add-btn">Submit</button> */}
        </div>
      </div>

        {/* Recipient Modal */}
        {selectedReport && (
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={recipientOpen}
                onHide={() => setRecipientOpen(false)}
                className="bg-dark"
            >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title id="contained-modal-title-vcenter">
                    <h6>View Recipients</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Recipients
                    message={selectedReport}
                    close={() => setRecipientOpen(false)} 
                    />
                </Modal.Body>
            </Modal>
        )}

      {loading && <Loader />}
    </div>
  );
};

export default UserProfile;
