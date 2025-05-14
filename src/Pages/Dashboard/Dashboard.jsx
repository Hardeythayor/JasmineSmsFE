import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header mt-5">Dashboard</h3>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="mb-2 fw-semibold">Total Sent SMS</div>
                <div className="fw-bold fs-4">0 items</div>
                <div className="text-muted small">SMS sent to total recipients</div>
              </div>
              <i className="fa-regular fa-message fa-lg text-secondary"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="mb-2 fw-semibold">Remaining Credits</div>
                <div className="fw-bold fs-3">12,952</div>
                <div className="text-muted small">Available Credits</div>
              </div>
              <i
                className="fa fa-credit-card fa-lg text-secondary"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="fw-semibold fs-5">
                  Recent credit transaction history
                </div>
                <i className="fa-solid fa-clock text-secondary fs-5"></i>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="text-danger d-flex justify-content-center align-items-center rounded-circle"
                      style={{backgroundColor: "#fee2e2", width: "40px", height: "40px"}}
                    >
                      <i className="fa-solid fa-arrow-down"></i>
                    </span>
                    <div>
                      <h6 className="mb-0">3rd party test sent</h6>
                      <small className="text-muted">May 6, 2025 07:56</small>
                    </div>
                  </div>
                  <span className="text-danger fw-semibold">-48</span>
                </div>
                <hr className="m-0" />

                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="text-danger d-flex justify-content-center align-items-center rounded-circle"
                      style={{backgroundColor: "#fee2e2", width: "40px", height: "40px"}}
                    >
                      <i className="fa-solid fa-arrow-down"></i>
                    </span>
                    <div>
                      <h6 className="mb-0">3rd party test sent</h6>
                      <small className="text-muted">May 6, 2025 02:59</small>
                    </div>
                  </div>
                  <span className="text-danger fw-semibold">-48</span>
                </div>
                <hr className="m-0" />

                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="text-success d-flex justify-content-center align-items-center rounded-circle"
                      style={{backgroundColor: "#dcfce7", width: "40px" , height: "40px"}}>
                      <i className="fa-solid fa-arrow-up"></i>
                    </span>
                    <div>
                      <h6 className="mb-0">3rd party test sent</h6>
                      <small className="text-muted">May 6, 2025 02:58</small>
                    </div>
                  </div>
                  <span className="text-success fw-semibold">+13,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="fw-semibold fs-5 mb-3">
                SMS sent in the last 14 days
              </div>
              <div style={{height: "260p"}}>
                <canvas
                  id="smsChart"
                  style={{width: "100%", height: "100%"}}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
