import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import "./Auth.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { storage } from "../../appwriteConfig";
import TestimonialSliderComponent from "../TestimonialSection/TestimonialSliderComponent";
// import useBooleanState from "../CommonFunctionalities/CustomHook/useToggleState";

function SignUp() {
  const { registerUser } = useAuth();
  const registerForm = useRef(null);
  // const [showPassword, setShowPassword] = useBooleanState(false);
  const [showPassword, setShowPassword] = useState(false);
  const bucketId = "Images";

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password = registerForm.current.password.value;

    const userInfo = { name, email, password };

    registerUser(userInfo);
  };

  // const googleSignUp = (e: any) => {
  //    e.preventDefault();
  //    account.createOAuth2Session('google',
  //    'http://localhost:5173/'
  //    )
  // };

  return (
    <div className="bg-light ">
      <div className="hero_section container bg-light mb-5">
        <div className="main_container modal-body row d-flex justify-content-between">
          <section className="col-md-6 d-flex flex-column">
            <div className="testimonial_description p-3">
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
            ref={registerForm}
            onSubmit={handleSubmit}
            className=" col-md-5 order-first order-md-1 bg-white d-flex flex-column gap-3 p-4 rounded"
          >
            <span className="h3 text-center">
              <b>Sign Up</b>
            </span>
            <p className="create_account text-center">
              Create an account to unlock exclusive features.
            </p>
            <div className="form-group">
              <label htmlFor="exampleInputName" className="fw-bold">
                Name
              </label>
              <input
                type="text"
                className="form-control p-3 shadow-none border-light"
                name="name"
                id="exampleInputName"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail" className="fw-bold">
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
            <div className="form-group d-flex gap-2">
              <input type="checkbox" />
              <label>
                I agree with
                <Link to="#" className="terms_of_use ">
                   Terms of Use
                </Link>
                and
                <Link to="#" className="privacy_policy">
                   Privacy Policy
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className="sign_up_submit_button border-0 rounded w-100 text-white mb-2 p-3"
            >
              Sign Up
            </button>
            <div className="border-0 border-bottom pb-3 text-center position-relative">
              <span className="position-absolute top-100 translate-middle bg-white p-2">
                Or
              </span>
            </div>
            <button
              type="submit"
              className="google_sign_up_button border-0 rounded w-100 mt-2 p-3"
              // onClick={(e) => googleSignUp(e)}
            >
              <img
                className="pe-3"
                src={`${storage.getFilePreview(bucketId, "GoogleLogo")}`}
              />
              Sign Up with Google
            </button>
            <div className="form-link d-flex align-content-center justify-content-center flex-wrap">
              <p>Don't have an account?</p>
              <Link to="/" className="text-black">
                Login
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="upright_arrow"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
