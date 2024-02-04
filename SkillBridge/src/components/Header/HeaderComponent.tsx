import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

import "./HeaderComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../../appwriteConfig";
import { useSelector } from "react-redux";
import Account from "../Account/Account";


function HeaderComponent() {
  const loginFormData = useSelector((state) => state.formData.loginFormData);

  const { user, logoutUser } = useAuth();
  const location = useLocation();

  return (
    <div className="header bg-light">
      <p className="topBanner font-weight-bold text-center text-white p-3">
        Free Courses 🌟 Sale Ends Soon, Get It Now
        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
      </p>
      <div className="bg-light">
        <nav className="navbar container  navbar-expand-lg ">
          <img
            className="navbar-brand"
            src={storage.getFilePreview("Images", "SkillBridgeLogo").href}
            alt="Skill bridge"
          />

          <div
            className="offcanvas offcanvas-end"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <img
                  className="navbar-brand"
                  src={storage.getFilePreview("Images", "SkillBridgeLogo").href}
                  alt="Skill bridge"
                />
                Skill bridge
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-3 pe-3">
                <li className="nav-item">
                  <Link
                    to="/home"
                    className={`nav-link ${location.pathname === "/home" ? "active" : ""
                      } `}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/course" className={`nav-link ${location.pathname === "/course" ? "active" : ""
                    } `}>
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""
                    } `}>
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pricing" className={`nav-link ${location.pathname === "/pricing" ? "active" : ""
                    } `}>
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""
                    } `}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="login_signup_toggle_container d-flex gap-2">
            {user ? (
              <Link to={'/account'} className="text-decoration-none">
                  <FontAwesomeIcon icon={faCircleUser} className="text-black w-100 pt-3" />
              </Link>
            ) : (
              <div className="d-flex gap-2">
                <Link
                  to="/signUp"
                  className={`signupLink p-2 ${location.pathname === "/signUp" ? "active" : ""
                    }`}
                >
                  Sign Up
                </Link>
                <Link
                  to="/"
                  className={`loginLink p-2 ${location.pathname !== "/signUp" ? "active" : ""
                    }`}
                >
                  Login
                </Link>
              </div>
            )}

            <button
              className="navbar-toggler border-0 shadow-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <img src={`${storage.getFilePreview('Images', '65b8dab91c7ff91617f8').href}`} alt="hamburger" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default HeaderComponent;
