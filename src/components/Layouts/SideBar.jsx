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
              {/* <li className="nav-item paragraph2">
                <a
                  className="nav-link"
                  href="https://t.me/HIP100"
                  id="sidebar-third-party-test"
                >
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i>{t("thirdPartyTest.pageHeading")}
                </a>
              </li> */}
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
              <span className="me-3" style={{fontSize: '25px'}}>
                <svg stroke="#0088cc" fill="#0088cc" stroke-width="0" viewBox="0 0 496 512" class="text-[#0088cc] h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path></svg>
              </span>
              {t("otherText.4")} <span className="text-primary">@HIP100</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
