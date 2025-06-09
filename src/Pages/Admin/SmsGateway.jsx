import React, { useEffect, useState } from "react";
import Loader from "../../components/utilities/Loader/Loader";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import './ManageUsers.css'; 

const SmsGateway = () => {
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const fetchGateways = () => {
    setLoading(true);
    const dummyGateways = [
      { id: 1, name: "Gateway A", sms_charges: 0.05, status: "active" },
      { id: 2, name: "Gateway B", sms_charges: 0.03, status: "deactivated" },
      { id: 3, name: "Gateway C", sms_charges: 0.07, status: "active" },
    ];

    setTimeout(() => {
      setGateways(dummyGateways);
      setPageCount(Math.ceil(dummyGateways.length / 10) || 1); 
      setLoading(false);
    }, 500);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const toggleStatus = (id, currentStatus) => {
    setGateways(prevGateways =>
      prevGateways.map(gateway =>
        gateway.id === id
          ? { ...gateway, status: currentStatus === "active" ? "deactivated" : "active" }
          : gateway
      )
    );
    toast.success("Gateway status updated locally");
  };

  useEffect(() => {
    fetchGateways();
  }, [page]); 

  return (
    <div className="container mt-4">
      <h3>SMS Gateway Management</h3>

      <div className="table-responsive">
        {loading ? (
          <Loader />
        ) : (
          <table className="table outer-bordered-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>SMS Charges</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gateways.length > 0 ? (
                gateways.map((gateway) => (
                  <tr key={gateway.id}>
                    <td>{gateway.id}</td>
                    <td>{gateway.name}</td>
                    <td>{gateway.sms_charges.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 rounded-pill ${
                          gateway.status === "active"
                            ? "bg-success text-white"
                            : "bg-danger text-white"
                        }`}
                      >
                        {gateway.status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-light"
                          type="button"
                          id={`gatewayDropdownMenuButton${gateway.id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`gatewayDropdownMenuButton${gateway.id}`}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => toggleStatus(gateway.id, gateway.status)}
                            >
                              {gateway.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No SMS gateways found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {gateways.length > 0 && (
        <div className="d-flex justify-content-end mt-3">
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default SmsGateway;
