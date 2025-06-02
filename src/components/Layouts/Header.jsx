import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuthContext";
import axiosInstance from "../../hooks/axiosInstance";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector";
import logo from "../../assets/logo.png"

const Header = () => {
  const {t} = useTranslation()

  const {userData, resetUser} = useAuth()
  const navigate = useNavigate()

  const [smsCharge, setSmsCharge] = useState(16)

const logout = () => {
    const url = '/user/auth/logout'
    const loginPath  = '/auth/login'
    

    axiosInstance.post(url)
        .then(res => {
            localStorage.removeItem('userData')
            resetUser()
            navigate(loginPath)
        })
        .catch((err) => {
            if (err.response.status == '401'){
                localStorage.removeItem('userData')
                navigate(loginPath)
            }
        })
}

const fetchSmsCharge = () => {
  axiosInstance.get("/user/message/charge")
    .then(res => {
      setSmsCharge(res.data.data)
    })
    .catch(err => {
      console.log(err.response);
      toast.error(t("otherText.6"))
    })
}

useEffect(() => {
    fetchSmsCharge()
  }, [])

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
                    src={logo}
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
                    806{t("dashboard.dashboardText.7")}
                    </span>

                    <ul
                        className="dropdown-menu p-3 w-50 shadow"
                        aria-labelledby="notificationDropdown"
                        style={{maxWidth: "350px", minWidth: "300px", right: 0, left: "auto"}}
                    >
                    <li className="fw-bold mb-2">{t("otherText.0")}</li>
                    <div className="d-flex justify-content-between">
                        <span>SMS</span>
                        <span>{smsCharge}{t("otherText.1")}</span>
                    </div>
                    </ul>
                </div>

                {/* <LanguageSelector /> */}
                {/* <div className="dropdown d-inline-block me-3 shadow-sm">
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
                </div> */}

                <div className="dropdown">
                    <div
                        className="fw-semibold dropdown paragraph2 text-decoration-none"
                        href="#"
                        role="button"
                        id="userDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {userData?.userInfo?.name}
                    </div>
                    <ul
                        className="dropdown-menu dropdown-menu-end mt-2 shadow-sms"
                        aria-labelledby="userDropdown"
                    >
                        <li className="px-2">
                            <NavLink className="dropdown-item" to="/settings">
                                {t("otherText.2")}
                            </NavLink>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li className="px-2">
                            <button className="dropdown-item" onClick={logout}>
                                {t("otherText.3")}
                            </button>
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
                    {/* <h5 className="offcanvas-title" id="mobileSidebarLabel">Menu</h5> */}
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column h-100">
                    <div>
                        <h6 className="sidebar-heading mt-4 mb-1 sub-heading">{t("sideBarHeading.0")}</h6>
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/" id="mobile-sidebar-send-text">{t("thirdPartyTest.pageHeading")}</NavLink></li>
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/test" id="mobile-sidebar-third-party-test">{t("thirdPartyTest.pageHeading")}</NavLink></li>
                        </ul>
                        <h6 className="sidebar-heading mt-4 mb-1 sub-heading">{t("sideBarHeading.1")}</h6>
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/dashboard">{t("dashboard.pageHeading")}</NavLink></li>
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/messages">{t("shipmentDetail.pageHeading")}</NavLink></li>
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/credits">{t("creditHistory.pageHeading")}</NavLink></li>
                        </ul>
                        <ul className="nav flex-column mb-2 mt-4">
                            <li className="nav-item paragraph2"><NavLink className="nav-link text-dark" to="/settings">{t("settings.pageHeading")}</NavLink></li>
                        </ul>
                    </div>
                    <div className="mt-auto text-center mb-3">
                        <a href="https://t.me/HIP100" className="d-block text-decoration-none">
                            <i className="fa fa-telegram fa-sm me-3"></i>
                            {t("otherText.4")} <span className="text-primary">@HIP100</span>
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Header;
