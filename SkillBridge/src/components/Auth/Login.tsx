import "./Auth.scss";
import { useAuth } from "../../utils/AuthContext";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { account, storage } from "../../appwriteConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import TestimonialSliderComponent from "../TestimonialSection/TestimonialSliderComponent";
import { useDispatch } from "react-redux";
import { setLoginFormData } from "../../redux/action";


function Login() {
  const { user, loginUser } = useAuth();
  const loginDispatch = useDispatch();
  const loginForm = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const bucketId = "Images";

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
    console.log(userInfo);
    
    loginUser(userInfo);
    loginDispatch(setLoginFormData(userInfo));
  };

  const handleForgotPassword = async () => {
    try {
      await account.createRecovery(
        loginForm.current.email.value,
        "/resetPassword"
      );
    } catch (error) {
      console.error(error);
    }
  };

  const googleSignIn = (e: any) => {
    e.preventDefault();
    account.createOAuth2Session("google", "http://localhost:5173/home");
  };

  return (
    <div className="bg-light ">
      <div className="hero_section container bg-light mb-5">
        <div className="main_container modal-body row d-flex justify-content-between">
          <section className="col-md-6 d-flex flex-column ">
            <div className="testimonial_description p-3  ">
              <span className="h1">Students Testimonials</span>
              <p>
                Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
                eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et.
                Ac cum eget habitasse in velit fringilla feugiat senectus in.
              </p>
            </div>
            <TestimonialSliderComponent/>
          </section>
          <form
            onSubmit={handleSubmit}
            ref={loginForm}
            className=" col-md-5  order-first order-md-1 bg-white d-flex flex-column gap-3 p-4 rounded"
          >
            <span className="h3 text-center fw-bold">
              Login
            </span>
            <p className="create_account text-center">
              Welcome back! please login to your account.
            </p>
            <div className="form-group">
              <label htmlFor="exampleInputEmail fw-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control p-3 shadow-none border-light"
                name="email"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword" className="fw-bold">
                Password
              </label>
              <div className="password_container d-flex align-items-center border-light rounded">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control p-3 shadow-none border-0 "
                  name="password"
                  id="exampleInputPassword"
                  placeholder="Password"
                  required
                />
                <button
                  className="border-0 bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
              </div>
            </div>
            <div className="form-group d-flex gap-2 justify-content-end ">
              <Link
                to="/forgotPassword"
                onClick={handleForgotPassword}
                className="forgot_password text-secondary text-decoration-none"
              >
                forgot password ?
              </Link>
            </div>
            <div className="form-group d-flex gap-2">
              <input type="checkbox" />
              <label className="text-secondary fw-medium">Remember me</label>
            </div>
            <button
              type="submit"
              className="sign_up_submit_button border-0 rounded w-100 text-white mb-2 p-3"
            >
              Login
            </button>
            <div className="border-0 border-bottom pb-3 text-center position-relative">
              <span className="position-absolute top-100 translate-middle bg-white p-2">
                Or
              </span>
            </div>
            <button
              type="submit"
              className="google_sign_up_button border-0 rounded w-100 mt-2 p-3"
              onClick={(e) => googleSignIn(e)}
            >
              <img
                src={`${storage.getFilePreview(bucketId, "GoogleLogo")}`}
                className="pe-3"
              />
              Login Up with Google
            </button>
            <div className="form-link d-flex align-content-center justify-content-center flex-wrap">
              <p>Don't have an account?</p>
              <Link to="/signUp" className="text-black">
                Sign Up
                <FontAwesomeIcon icon={faArrowRight} className="upright_arrow"/>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
