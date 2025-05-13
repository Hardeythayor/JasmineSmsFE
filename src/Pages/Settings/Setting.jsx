import React from "react";
import "./Setting.css";

const Setting = () => {
  return (
    <div className="mx-0">
        <div className="content-header-wrapper">
            <h3 className="mb-0 content-header">setting</h3>
            <p className="content-subheading">Manage your account settings</p>
        </div>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h5
            className="card-title fw-bold"
            style={{fontSize: "24px", fontWeight: 600, lineHeight: "24px", color: "rgb(10, 10, 10)"}}
          >
            Change Password
          </h5>
          <p className="paragraph">You can change your account password</p>

          <form id="changePasswordForm" className="validation">
            <div className="mb-3">
              <label for="currentPassword" className="form-label paragraph2">
                Current password
              </label>
              <div className="input">
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  required
                />
              </div>
              <div className="invalid-feedback" id="currentPasswordError"></div>
            </div>

            <div className="mb-3">
              <label for="newPassword" className="form-label paragraph2">
                New Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  required
                />
              </div>
              <div className="invalid-feedback" id="newPasswordError"></div>
              <div id="passwordStrength" className="form-text"></div>
            </div>

            <div className="mb-3">
              <label for="confirmPassword" className="form-label paragraph2">
                Confirm new password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  required
                />
              </div>
              <div className="invalid-feedback" id="confirmPasswordError"></div>
            </div>
            <button type="submit" className="btn btn-dark custom-btn btn-lg">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
