import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  const {t} = useTranslation();

  return (
    <div className="col-lg-2 d-none d-lg-block"> {/* Keep the same grid structure as the regular sidebar */}
      <nav className="sidebar p-0 border-end">
        <div className="p-2">
          <div>
            <h6 className="sidebar-heading mt-4 mb-1 sub-heading">
               Admin Navigation {/* Consider adding this to your translation files */}
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/admin">
                  <i className="fa-regular fa-message fa-sm text-black me-3"></i> {/* Use appropriate icons */}
                  Admin Dashboard {/* Consider adding this to your translation files */}
                </NavLink>
              </li>
              <li className="nav-item paragraph2">
                <NavLink className="nav-link" to="/admin/users">
                  <i className="fa-regular fa-user fa-sm text-black me-3"></i> {/* Use appropriate icons */}
                  Manage Users {/* Consider adding this to your translation files */}
                </NavLink>
              </li>
              {/* Add more admin links here as you create admin sub-pages */}
            </ul>
            {/* You can add other sections specific to admin here */}
          </div>
          {/* Decide if the Telegram link or other elements should appear in the admin sidebar */}
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