import React, { useEffect } from "react";
import "./ShipmentDetails.css";

const ShipmentDetails = () => {
    useEffect(() => {
        const initializeClickableCells = () => {
            let lastClickedCell = null;
            
            document.querySelectorAll(".clickable-cell").forEach(function (cell) {
                cell.addEventListener("click", function (event) {
                event.stopPropagation();
                
                const row = this.closest('tr');
                const nextRow = row.nextElementSibling;
                const expandedContent = nextRow.querySelector('.expanded-content');
                
                if (lastClickedCell === this) {
                    if (nextRow && nextRow.style.display === 'none') {
                    nextRow.style.display = '';
                    } else {
                    nextRow.style.display = 'none';
                    }
                    return;
                }

                if (nextRow && nextRow.classList.contains('expanded-row')) {
                    nextRow.style.display = '';
                }

                lastClickedCell = this;
                });
            });

            document.addEventListener("click", function (event) {
                const expandedRows = document.querySelectorAll('.expanded-row');
                
                expandedRows.forEach(row => {
                if (!row.contains(event.target) && !event.target.classList.contains('clickable-cell')) {
                    row.style.display = 'none';
                }
                });

                lastClickedCell = null;
            });
        }

        initializeClickableCells()
    }, [])
    
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
        />
      </div>

      <div className="table-responsive col-xl-10">
        <table className="table table-hover table-bordered-outer p-1">
          <thead>
            <tr>
              <th className="text-muted ship-paragraph text-start d-none d-md-table-cell">
                Time of dispatch
              </th>
              <th className="text-muted ship-paragraph text-start">Category</th>
              <th className="text-muted ship-paragraph text-start">Detail</th>
              <th className="text-muted ship-paragraph text-end d-none d-md-table-cell">
                Recipient
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="clickable-cell ship-paragraph2 text-start d-none d-md-table-cell">
                2025-05-09 16:34
              </td>
              <td className="clickable-cell ship-paragraph2 text-start">
                <span
                  className="badge rounded-pill text-success"
                  style={{background: "#dcfce7"}}
                >
                  immediately
                </span>
              </td>
              <td className="clickable-cell ship-paragraph2 text-start">
                Casino 10po
                <div className="d-block d-md-none mt-2">
                  <small className="text-muted d-block paragraph">
                    2025-05-09 16:34
                  </small>
                  <small className="text-muted d-block paragraph">
                    1 person
                  </small>
                </div>
              </td>

              <td className="clickable-cell ship-paragraph2 text-end d-none d-md-table-cell">
                1 person
              </td>
            </tr>

            <tr className="expanded-row" style={{display: "snone"}}>
              <td colSpan="4">
                <div className="card shadow-sm expanded-content no-border-card">
                  <div className="card-body">
                    <h5 className="sub-heading mb-3 paragraph">situation</h5>
                    <div className="row g-4">
                      <div className="col-12 col-md-6">
                        <p
                          className="mb-2 badge text-success rounded-pill paragraph"
                          style={{background: "#dcfce7"}}
                        >
                          complete
                        </p>
                        <p className="mb-2 paragraph">Message content</p>
                        <p className="mb-2 paragraph2">Casino 10po</p>
                      </div>

                      <div className="col-12 col-md-6 shipment p-3 shadow-sm">
                        <p className="paragraph2" style={{color: "#1C4ED8"}}>
                          <i
                            className="fa fa-truck text-black"
                            aria-hidden="true"
                          ></i>{" "}
                          Shipping Information
                        </p>
                        <p className="mb-2 d-flex justify-content-between paragraph">
                          Shipment Type:{" "}
                          <b className="mb-0 paragraph2">Send immediately</b>
                        </p>
                        <p className="mb-2 d-flex justify-content-between paragraph">
                          Number of recipients:{" "}
                          <b className="mb-0 paragraph2">1 person</b>
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
                            <p className="mb-0 mt-1">0pcs</p>
                          </div>

                          <div
                            className="badge text-danger py-2 px-2 d-flex flex-column align-items-start text-start"
                            style={{background: "#fee2e2", width: "25%"}}
                          >
                            <small>failure</small>
                            <p className="mb-0 mt-1">0pcs</p>
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
                          <b className="mb-0 paragraph2">2025-05-09 16:34</b>
                        </p>
                      </div>

                      <div className="row mt-3 w-100 m-0 p-0 d-flex justify-content-end gap-2">
                        <div className="col-12 col-md-auto mb-2 mb-md-0 p-0">
                          <button className="btn btn-primary w-100 px-3">
                            Export
                          </button>
                        </div>
                        <div className="col-12 col-md-5 p-0">
                          <a
                            href="#view-details"
                            className="btn btn-dark w-100"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentDetails;
