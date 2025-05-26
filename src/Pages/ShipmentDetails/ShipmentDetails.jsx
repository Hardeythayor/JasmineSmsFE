import React, { useEffect, useState } from "react";
import "./ShipmentDetails.css";
import axiosInstance from "../../hooks/axiosInstance";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuthContext";
import { Pagination } from "@mui/material";
import { NavLink } from "react-router-dom";

const ShipmentDetails = () => {
  const {userData} =  useAuth()

  const [loading, setLoading] = useState(false)
  const [singleLoading, setSingleLoading] = useState(false)
  const [smsReport, setSmsReport] = useState([])
  const [singleSmsReport, setSingleSmsReport] = useState([])
  const [filter, setFilter] = useState({search: ''})

  //  state for pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  //  pagination function
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const fetchSmsReport = () => {
    setLoading(true)
        axiosInstance.post(`/user/message/report/${userData.userInfo.id}?page=${page}`, filter)
                    .then(res => {
                      setSmsReport(res.data.data.data)
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
  }

  const fetchSingleSmsReport = (id) => {
    setSingleLoading(true)
        axiosInstance.get(`/user/message/report/single/${id}`)
                    .then(res => {
                      setSingleSmsReport(res.data.data)
                    })
                    .catch(err => {
                        console.log(err.response);
                        toast.error(err.response.data.message)
                    })
                    .finally(() => setSingleLoading(false))
  }

  const toggleSelection = (i, rec) => {
      const row = document.getElementById(`expanded${i}`)
      row.classList.toggle('d-none');
      fetchSingleSmsReport(rec.id)
  }

  useState(() => {
    fetchSmsReport()
  }, [filter])
    
  return (
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header">Shipment Details</h3>
      </div>

      <div className="search-container col-xl-4 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search by content"
          name="search"
          value={filter.search}
          onChange={handleFilterChange}
        />
      </div>

      <div className="table-responsive col-xl-10">
        <table className="table table-hover table-bordered-outer p-1">
          <thead>
            <tr>
              <th className="text-muted ship-paragraph text-start d-none d-md-table-cell" width="15%">
                Time of dispatch
              </th>
              <th className="text-muted ship-paragraph text-start" width="12%">Category</th>
              <th className="text-muted ship-paragraph text-start">Detail</th>
              <th className="text-muted ship-paragraph text-end d-none d-md-table-cell">
                Recipient
              </th>
            </tr>
          </thead>
          <tbody>
            {smsReport.length > 0 ?
                smsReport.map((report, i) => (
                  <>
                    <tr key={i} onClick={() => toggleSelection(i, report)}>
                      <td className="clickable-cell ship-paragraph2 text-start d-none d-md-table-cell">
                        {report.created_at}
                      </td>
                      <td className="clickable-cell ship-paragraph2 text-start">
                        <span
                          className="badge rounded-pill bg-success-light px-3 py-2 text-success"
                        >
                          {report.send_type}
                        </span>
                      </td>
                      <td className="clickable-cell ship-paragraph2 text-start">
                        {report.content}
                        <div className="d-block d-md-none mt-2">
                          <small className="text-muted d-block paragraph">
                            {report.created_at}
                          </small>
                          <small className="text-muted d-block paragraph">
                            {`${report.recipient_count} ${report.recipient_count > 1 ? 'people' : 'person'}`}
                          </small>
                        </div>
                      </td>

                      <td className="clickable-cell ship-paragraph2 text-end d-none d-md-table-cell">
                        {`${report.recipient_count} ${report.recipient_count > 1 ? 'people' : 'person'}`}
                      </td>
                    </tr>

                    <tr className="d-none" key={`expanded${i}`} id={`expanded${i}`}>
                      <td colSpan="4">
                        <div className="card shadow-sm expanded-content no-border-card">
                          <div className="card-body">
                            <h5 className="sub-heading mb-0 paragraph  ms-0">situation</h5>
                            <div className="row g-4">
                              <div className="col-12 col-md-6">
                                <p
                                  className="mb-3 badge text-success bg-success-light rounded-pill paragraph">
                                  {report.status == 'success' ? 'complete' : 'incomplete'}
                                </p>
                                <p className="mb-2 paragraph">Message content</p>
                                <div className="bg-light mb-2 p-2 rounded-lg">
                                  <p className="paragraph2 m-0">{report.content}</p>
                                </div>
                              </div>

                              <div className="col-12 col-md-6 shipment p-3 shadow-sm">
                                <p className="paragraph2" style={{color: "#1C4ED8"}}>
                                  <i
                                    className="mdi mdi-newspaper-variant-outline text-muted"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Shipping Information
                                </p>
                                <p className="mb-2 d-flex justify-content-between paragraph">
                                  Shipment Type:{" "}
                                  <b className="mb-0 paragraph2">{report.send_type == 'immediately' ? 'Send immediately' : 'Reserved'}</b>
                                </p>
                                <p className="mb-2 d-flex justify-content-between paragraph">
                                  Number of recipients:{" "}
                                  <b className="mb-0 paragraph2">{`${report.recipient_count} ${report.recipient_count > 1 ? 'people' : 'person'}`}</b>
                                </p>

                                <hr className="mb-0" />
                                <small className="paragraph mt-0">
                                  shipment status
                                </small>
                                <div className="d-flex flex-wrap w-100">
                                  <div
                                    className="badge text-success py-2 px-2 d-flex flex-column align-items-start text-start"
                                    style={{background: "#dcfce7", width: "25%"}}
                                  >
                                    <small>success</small>
                                    <p className="mb-0 mt-1">{singleSmsReport?.success_count}pcs</p>
                                  </div>

                                  <div
                                    className="badge text-danger py-2 px-2 d-flex flex-column align-items-start text-start"
                                    style={{background: "#fee2e2", width: "25%"}}
                                  >
                                    <small>failure</small>
                                    <p className="mb-0 mt-1">{singleSmsReport?.fail_count}pcs</p>
                                  </div>

                                  <div
                                    className="badge text-warning py-2 px-2 d-flex flex-column align-items-start text-start"
                                    style={{background: "#fef3c7", width: "25%"}}
                                  >
                                    <small>atmosphere</small>
                                    <p className="mb-0 mt-1">0pcs</p>
                                  </div>

                                  <div
                                    className="badge text-secondary py-2 px-2 d-flex flex-column align-items-start text-start"
                                    style={{background: "#e5e7eb", width: "25%"}}
                                  >
                                    <small>cancellation</small>
                                    <p className="mb-0 mt-1">0pcs</p>
                                  </div>
                                </div>

                                <hr className="mt-2 mb-1" />
                                <p className="d-flex justify-content-between paragraph mb-0">
                                  Shipment Time:{" "}
                                  <b className="mb-0 paragraph2">{report.created_at}</b>
                                </p>
                              </div>

                              <div className="row mt-3 w-100 m-0 p-0 d-flex justify-content-end gap-2">
                                <div className="col-12 col-md-auto mb-2 mb-md-0 p-0">
                                  <button className="btn btn-primary w-100 px-3">
                                    Export
                                  </button>
                                </div>
                                <div className="col-12 col-md-5 p-0">
                                  <NavLink
                                    to={`/details/${report.id}`}
                                    className="btn btn-dark w-100"
                                  >
                                    View Details
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                ))
              :
                <tr>
                  <td colSpan={4}>
                    <p className="text-center">No Record Found</p>
                  </td>
                </tr>
            }
          </tbody>
        </table>
        {smsReport.length > 0 && <div className="col-sm-12 d-flex justify-content-end mt-4">
            <Pagination
                onChange={handlePageChange}
                count={pageCount}
                color="primary"
                shape="rounded"
                size="small"
                page={page}
            />
        </div>}
      </div>
    </div>
  );
};

export default ShipmentDetails;
