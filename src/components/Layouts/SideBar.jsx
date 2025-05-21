import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="col-lg-2 d-none d-lg-block">
      <nav className="sidebar p-0 border-end">
        <div className="p-2">
          <div>
            <h6 className="sidebar-heading mt-4 mb-1 sub-heading">
              Sending Management
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/" id="sidebar-send-text">
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>
                  Send text
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink
                  className="nav-link"
                  to="/test"
                  id="sidebar-third-party-test"
                >
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>3rd
                  party test
                </NavLink>
              </li>
            </ul>
            <h6 className="sidebar-heading mt-4 mb-1 sub-heading">
              Manage history
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/dashboard">
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/messages">
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>
                  Shipment details
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/credits">
                  <i className="fa fa-credit-card fa-sm text-black me-3"></i>
                  Credit History
                </NavLink>
              </li>
            </ul>
            <ul className="nav flex-column mb-2 mt-4">
              <li className="nav-item paragraph2" style={{color: "rgb(10, 10, 10)"}}>
                <NavLink className="nav-link" to="/settings">
                  <i className="mdi mdi-cog-outline me-3"></i>setting
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="px-3 mt-4 mb-1">
            <a href="#" className="d-block">
              inquiry <span className="text-primary">@SeaSMS</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
