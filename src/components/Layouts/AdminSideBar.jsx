import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  const {t} = useTranslation();

  return (
    <div className="col-lg-2 d-none d-lg-block"> 
      <nav className="sidebar p-0 border-end">
        <div className="p-2">
          <div>
            <h6 className="sidebar-heading mt-4 mb-1 sub-heading">
               Admin Navigation 
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/admin">
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i> 
                  Dashboard 
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/admin/users">
                  <i className="fa-regular fa-user fa-sm text-black me-3"></i> 
                  Manage Users 
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/admin/sms-gateway">
                  <i className="fas fa-server fa-sm text-black me-3"></i>
                  SMS Gateway
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/admin/other-settings">
                  <i className="fas fa-cog fa-sm text-black me-3"></i>
                  Other Settings
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/settings">
                  <i className="mdi mdi-cog-outline me-3"></i>Setting
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

export default AdminSideBar;