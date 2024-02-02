import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { storage } from "../../appwriteConfig";

function Footer() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="footer mt-5  bg-white ">
      <section className="container">
        <div className=" d-flex row p-3">
          <section className="AddressSection col-12 col-md-5 ">
          <img className="navbar-brand" src={storage.getFilePreview('Images','SkillBridgeLogo').href} alt="Skill bridge" />
            <div className="Logo"></div>
            <div className="addressContainer d-flex flex-column mt-3">
              <div className="mail d-flex  gap-2">
                <button className="align-self-start border-0 bg-transparent">
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
                <p className="fw-bold align-self-start">
                  hello@skillbridge.com
                </p>
              </div>
              <div className="phoneNumber d-flex align-items-start gap-2">
              <button className="align-self-start border-0 bg-transparent">
                  <FontAwesomeIcon icon={faPhone} />
                </button>
                <p className="fw-bold">+91 91813 23 2309</p>
              </div>
              <div className="location d-flex align-items-start  gap-2">
              <button className="align-self-start border-0 bg-transparent">
                  <FontAwesomeIcon icon={faLocationDot} />
                </button>
                <p className="fw-bold">Somewhere in the world</p>
              </div>
            </div>
          </section>
          <section className="LinksContainer col-12 col-md-7 row ">
            <div className="HomeAbout  col-12 col-md-8 row ">
              <div className="Home col-6 d-flex flex-column flex-nowrap">
                <Link
                  to="/home"
                  className="fw-bold text-black text-decoration-none"
                >
                  Home
                </Link>
                <a
                  href="/home#benefits"
                  className="text-decoration-none text-secondary"
                >
                  Benefits
                </a>
                <a
                  href="/home#courses"
                  className="text-decoration-none text-secondary"
                >
                  Our Courses
                </a>
                <a
                  href="/home#testimonials"
                  className="text-decoration-none text-secondary"
                >
                  Our Testimonials
                </a>
                <a
                  href="/home#faq"
                  className="text-decoration-none text-secondary"
                >
                  Our FAQ
                </a>
              </div>
              <div className="About col-6 d-flex flex-column flex-nowrap">
                <Link
                  to="/about"
                  className="fw-bold text-black text-decoration-none"
                >
                  About
                </Link>
                <a
                  href="/about#ourgoals"
                  className="text-decoration-none text-secondary"
                >
                  Our Goals
                </a>
                <a
                  href="/about#achievements"
                  className="text-decoration-none text-secondary"
                >
                  Achievements
                </a>
                <a
                  href="/about#company"
                  className="text-decoration-none text-secondary"
                >
                  Company
                </a>
              </div>
            </div>
            <div className="SocialMediaSection col-12 col-md-4">
              <p className="fw-bold">Social Profiles</p>
              <div className="socialMediaContainer d-flex gap-2">
                <button className="btn bg-light">
                  <FontAwesomeIcon icon={faFacebook}  />
                </button>
                <button className="btn bg-light">
                  <FontAwesomeIcon icon={faTwitter}  />
                </button>
                <button className="btn bg-light">
                  <FontAwesomeIcon icon={faLinkedin}  />
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section className="bottom_footer border-top p-3 mt-2">
        <p className="text-center">© 2023 Skillbridge. All rights reserved.</p>
      </section>
    </div>
  );
}

export default Footer;
