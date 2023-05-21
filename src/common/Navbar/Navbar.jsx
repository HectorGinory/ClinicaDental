import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/gintooth_white.png";

import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);
  const dispatch = useDispatch();
  return (
    <>
      <div className="navbar-container">
        <div className="name-clinic click" onClick={() => navigate("/")}>
          <p>Clinica dental</p>
          <p>Dr. SMILE</p>
        </div>
        <div className="menu-container flex-c-c">
          <div className="lines-container">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
            <div className="btn-container">
              <div className="btn-navbar click flex-c-c" onClick={() => navigate("/")}>
                Home
              </div>
              {!userRdxData.credentials?.token ? (
                <>
                    <div
                      className="btn-navbar click flex-c-c"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </div>
                    <div
                      className="btn-navbar click flex-c-c"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </div>
                </>
              ) : (
                <>
                  {userRdxData.credentials.user.rol === "Admin" && (
                      <div
                        className="btn-navbar click flex-c-c"
                        onClick={() => navigate("/Admin")}
                      >
                        Admin
                      </div>
                  )}
                    <div
                      className="btn-navbar click flex-c-c"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </div>
                    <div
                      className="btn-navbar click flex-c-c"
                      onClick={() => navigate("/newquote")}
                    >
                      New Quote
                    </div>
                    <div
                      className="btn-navbar click flex-c-c"
                      onClick={() => {
                        dispatch(logout());
                        navigate("/");
                      }}
                    >
                      Logout
                  </div>
                </>
              )}
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
