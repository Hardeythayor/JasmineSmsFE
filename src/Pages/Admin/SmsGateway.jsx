import React, { useEffect, useState } from "react";
import Loader from "../../components/utilities/Loader/Loader";
import { toast } from "react-toastify";
import axiosInstance from "../../hooks/axiosInstance";
import UpdateCharge from "../../components/Modal/SmsGateway/UpdateCharge";
import { Modal } from "react-bootstrap";

const SmsGateway = () => {
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null)
  const [chargeOpen, setChargeOpen] = useState(false)

  const openUpdateChargeModal = (currentGateway) => {
    setSelectedGateway(currentGateway)
    setChargeOpen(true)
  }

  const fetchGateways = () => {
    setLoading(true);
    axiosInstance.get(`/admin/sms_gateway`)
      .then(res => {
        setGateways(res.data.data)
      })
      .catch(err => {
          console.log(err.response);
          toast.error(err.response.data.message)
      })
      .finally(() => setLoading(false))
  };

  const toggleStatus = (id, currentStatus) => {
    setLoading(true)
    axiosInstance.patch(`/admin/sms_gateway/activate/${id}`, {status: currentStatus == 'active' ? 'inactive' : 'active'})
      .then(res => {
        toast.success(res.data.message)
        fetchGateways()
      })
      .catch(err => {
          console.log(err.response);
          toast.error(err.response.data.message)
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    fetchGateways();
  }, []); 

  return (
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header">Manage SMS Gateway</h3>
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
                <th>SMS Charge</th>
                <th>Status</th>
                <th width="5%">Action</th>
              </tr>
            </thead>
            <tbody>
              {gateways.length > 0 ? (
                gateways.map((gateway, i) => (
                  <tr key={gateway.id}>
                    <td>{i+1}</td>
                    <td>{gateway.id}</td>
                    <td>{Number(gateway.sms_charge)}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 rounded-pill text-capitalize ${
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
                          {gateway.status === "inactive" && <li>
                            <button
                              className="dropdown-item"
                              onClick={() => toggleStatus(gateway.id, gateway.status)}
                            >
                              Activate
                            </button>
                          </li>}
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => openUpdateChargeModal(gateway)}
                            >
                              Update Sms Charge
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
                    No Record found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Update Sms Charge Modal */}
      {selectedGateway && (
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={chargeOpen}
          onHide={() => setChargeOpen(false)}
        >
          <Modal.Header closeButton className="bg-light">
            <Modal.Title id="contained-modal-title-vcenter">
              <h5>SMS Charge for <b className="text-uppercase text-info">{selectedGateway.id}</b> Gateway</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateCharge 
              selectedGateway={selectedGateway}
              close={() => setChargeOpen(false)} 
              reload={() => fetchGateways()}
            />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default SmsGateway;
