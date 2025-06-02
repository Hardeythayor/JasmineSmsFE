import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const {t} = useTranslation()

  return (
    <div className="col-lg-2 d-none d-lg-block">
      <nav className="sidebar p-0 border-end">
        <div className="p-2">
          <div>
            <h6 className="sidebar-heading mt-4 mb-1 sub-heading">
              {t("sideBarHeading.0")}
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/" id="sidebar-send-text">
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>
                  {t("homePage.pageHeading")}
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink
                  className="nav-link"
                  to="/test"
                  id="sidebar-third-party-test"
                >
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>{t("thirdPartyTest.pageHeading")}
                </NavLink>
              </li>
            </ul>
            <h6 className="sidebar-heading mt-4 mb-1 sub-heading">
              {t("sideBarHeading.1")}
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/dashboard">
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>
                  {t("dashboard.pageHeading")}
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/messages">
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>
                  {t("shipmentDetail.pageHeading")}
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/credits">
                  <i className="fa fa-credit-card fa-sm text-black me-3"></i>
                  {t("creditHistory.pageHeading")}
                </NavLink>
              </li>
            </ul>
            <ul className="nav flex-column mb-2 mt-4">
              <li className="nav-item paragraph2" style={{color: "rgb(10, 10, 10)"}}>
                <NavLink className="nav-link" to="/settings">
                  <i className="mdi mdi-cog-outline me-3"></i>{t("settings.pageHeading")}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="px-3 mt-4 mb-1">
            <a href="https://t.me/HIP100" className="d-block text-decoration-none">
              <i className="fa fa-telegram fa-sm me-3"></i>
              {t("otherText.4")} <span className="text-primary">@HIP100</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
