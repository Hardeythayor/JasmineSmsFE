import React from "react";
import "./ThirdParty.css";

const Thirdparty = () => {
  return (
    <div className="mx-0">
      <div className="content-header-wrapper">
        <h3 className="mb-0 content-header">3rd party test</h3>
        <p className="content-subheading">
          You can check whether the message is sent normally by testing it
          before sending it.
        </p>
      </div>

      <div className="card mb-4 col-12 col-xl-6 px-2 py-2 shadow-sm">
        <div className="card-body">
          <div className="mb-3 d-flex gap-2 align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm text-black fw-normal btn-hover p-2 px-2"
              type="button"
            >
              <i className="fa fa-smile-o me-2 paragraph4" aria-hidden="true"></i>
              Emoticon
            </button>

            <a
              href="https://tinyurl.com/"
              target="_blank"
              className="btn btn-outline-secondary btn-sm fw-normal text-black text-decoration-none btn-hover p-2 px-2"
            >
              <i className="fas fa-up-right-from-square me-2"></i>Short URL
            </a>

            <span className="ms-auto small text-muted" id="char-count">
              0/70
            </span>
          </div>
          <textarea
            className="form-control mb-3 paragraph4"
            rows="6"
            maxlength="70"
            placeholder="Please enter the message you want to test"
            id="test-message"
          ></textarea>

          <div className="d-flex justify-content-end">
            <button
              className="btn px-4 btn-dark btn-text2 send-hover"
              id="start-testing-btn"
            >
              Start testing
            </button>
          </div>
        </div>
      </div>
      <div>
        <h5
          className="mb-3 mt-5"
          style={{fontSize: "20px", fontWeight: 600, lineHeight: "28px", color: "rgb(10, 10, 10)"}}>
          Recent test results
        </h5>
        <div
          className="table-responsive p-4 me-3 shadow-sm"
          style={{border: "1px solid #e5e5e5", borderRadius: "5px"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-muted fw-normal">hour</th>
                <th className="text-muted fw-normal">detail</th>
                <th className="text-muted fw-normal text-center">SKT</th>
                <th className="text-muted fw-normal text-center">KT</th>
                <th className="text-muted fw-normal text-center">LGU+</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{fontSize: "14px"}}>
                <td>2025-05-08 07:56:47</td>
                <td>Hello</td>
                <td className="text-success text-center">
                  <i className="fa-solid fa-check"></i>
                </td>
                <td className="text-success text-center">
                  <i className="fa-solid fa-check"></i>
                </td>
                <td className="text-success text-center">
                  <i className="fa-solid fa-check"></i>
                </td>
              </tr>
              <tr style={{fontSize: "14px"}}>
                <td>2025-05-06 02:59:53</td>
                <td>Casino 10% off combo</td>
                <td className="text-danger text-center">
                  <i className="fa-solid fa-xmark"></i>
                </td>
                <td className="text-success text-center">
                  <i className="fa-solid fa-check"></i>
                </td>
                <td className="text-success text-center">
                  <i className="fa-solid fa-check"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="testModal" className="modal-overlay" style={{display: "none"}}>
        <div className="modal-box">
          <span className="close-btn" onclick="closeModal()">
            &times;
          </span>
          <h3 className="text-sub">3rd party test confirmed</h3>
          <p className="paragraph">Would you like to conduct a 3-party test?</p>
          <p className="text-p">
            The test can only be taken once every 30 seconds.
          </p>
          <div className="modal-actions">
            <button onclick="closeModal()" className="cancel-btn">
              cancellation
            </button>
            <button className="check-btn btn-text2">check</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thirdparty;
