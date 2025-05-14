import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom position-fixed w-100" style={{top: 0}}>
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                <button
                    className="btn d-lg-none me-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileSidebar"
                    aria-controls="mobileSidebar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img
                    src="https://www.bada-sms.com/logo.png"
                    alt="SeaSMS Logo"
                    style={{maxHeight: "32px"}}
                    className="me-2"
                    />
                    {/* <!-- <span className="fw-bold">SeaSMS</span> --> */}
                </a>
                </div>
                <div className="d-flex align-items-center ms-auto">
                {/* <!-- <span className="badge rounded-pill paragraph2 d-none d-lg-inline me-4">806 cases</span> --> */}
                <div className="dropdown d-inline">
                    <span
                    className="badge text-dark rounded-pill paragraph2 d-none d-lg-inline me-5 dropdown"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                    id="casesDropdown"
                    >
                    806 cases
                    </span>

                    <ul
                    className="dropdown-menu p-3 w-50 shadow"
                    aria-labelledby="notificationDropdown"
                    style={{maxWidth: "350px", minWidth: "300px", right: 0, left: "auto"}}
                    >
                    <li className="fw-bold mb-2">Message Unit Price Guide</li>
                    <div className="d-flex justify-content-between">
                        <span>SMS</span>
                        <span>16 credits</span>
                    </div>
                    </ul>
                </div>

                <div className="dropdown d-inline-block me-3 shadow-sm">
                    <span
                    className="paragraph2 dropdown"
                    role="button"
                    id="notificationDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    <i className="fa-regular fa-bell"></i>
                    </span>

                    <div
                    className="dropdown-menu p-3 w-100 shadow"
                    aria-labelledby="notificationDropdown"
                    style={{maxWidth: "360px", minWidth: "270px", right: 0, left: "auto"}}
                    >
                    <div className="fw-bold mb-2">alarm</div>

                    <div className="mb-3">
                        <div className="fw-bold">Renewal Notice</div>
                        <div className="text-muted small">
                        Thank you for using the sea character. In order to show our
                        appreciation for the...
                        </div>
                        <div className="text-muted small">April 25, 2025 00:59</div>
                    </div>

                    <div className="mb-3">
                        <div className="fw-bold">Inspection Completion Notice</div>
                        <div className="text-muted small">
                        Hello. Regarding the delayed issuance of receipts due to the
                        previous day's waiti...
                        </div>
                        <div className="text-muted small">April 10, 2025 05:14</div>
                    </div>

                    <div className="mb-3">
                        <div className="fw-bold">hello</div>
                        <div className="text-muted small">
                        Currently, some specific transmissions are being processed
                        as transmission...
                        </div>
                        <div className="text-muted small">March 29, 2025 04:15</div>
                    </div>

                    <div className="mb-3">
                        <div className="fw-bold">hello</div>
                        <div className="text-muted small">
                        Due to the current server expansion, please limit the number
                        of items to 500...
                        </div>
                        <div className="text-muted small">March 22, 2025 04:06</div>
                    </div>

                    <div>
                        <div className="fw-bold">hello</div>
                        <div className="text-muted small">
                        We are currently increasing server traffic. For smooth
                        delivery, please send less...
                        </div>
                        <div className="text-muted small">March 22, 2025 03:39</div>
                    </div>
                    </div>
                </div>

                <div className="dropdown">
                    <a
                    className="fw-semibold dropdown paragraph2 text-decoration-none"
                    href="#"
                    role="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    Jeongpal
                    </a>
                    <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                    >
                    <li>
                        <a className="dropdown-item" href="#setting">
                        Profile Settings
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="login.html">
                        Logout
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </nav>
    
        {/* <!-- Offcanvas Sidebar for mobile --> */}
        <div className="contaier-fluid">
            <div className="d-lg-none">
                <div className="offcanvas offcanvas-start custom-offcanvas" tabindex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="mobileSidebarLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column h-100">
                    <div>
                        <h6 className="sidebar-heading mt-4 mb-1 sub-heading">Sending Management</h6>
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/" id="mobile-sidebar-send-text">Send text</NavLink></li>
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/test" id="mobile-sidebar-third-party-test">3rd party test</NavLink></li>
                        </ul>
                        <h6 className="sidebar-heading mt-4 mb-1 sub-heading">Manage history</h6>
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/dashboard">Dashboard</NavLink></li>
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/messages">Shipment details</NavLink></li>
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/credits">Credit History</NavLink></li>
                        </ul>
                        <ul className="nav flex-column mb-2 mt-4">
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/settings">setting</NavLink></li>
                        </ul>
                    </div>
                    <div className="mt-auto text-center mb-3">
                    <a href="#" className="d-block">inquiry <span className="text-primary">@SeaSMS</span></a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Header;
