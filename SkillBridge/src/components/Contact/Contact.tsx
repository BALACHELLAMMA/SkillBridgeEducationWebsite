import "./Contact.scss";
import React, { useEffect, useRef, useState } from "react";
import { ID } from "appwrite";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { databases } from "../../appwriteConfig";
import { updateFormData } from "../../contactRedux/Store";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

interface FormData {
    firstnameInput: string;
    lastnameInput: string;
    emailInput: string;
    phoneInput: string;
    subjectInput: string;
    messageInput: string;
}

interface ContactFormDataRedux {
  formData :{
    firstName: string;
    lastName:string;
    userEmail: string;
    phoneNumber:string;
    subject:string;
    message:string;
  }
}


function Contact() {

  const [descriptionDocument, setDescriptionDocument] = useState<Object>({});
 
  useEffect(() => {
    const fetchDescription = async () => {
      try {

        const descriptionResponse = await databases.getDocument(
          "65a0d58f05d18f1fd844",
          "DescriptionDataCollection",
          "2"
        );

        setDescriptionDocument(descriptionResponse);
      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchDescription();
  }, []);
  
  // const firstNameRef = useRef(null);
  // const lastNameRef = useRef(null);
  // const emailRef = useRef(null);
  // const phoneRef = useRef(null);
  // const subjectRef = useRef(null);
  // const messageRef = useRef(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = async(e:any)=>{
    e.preventDefault();

    const contactDispatch = useDispatch();
    const {firstName,lastName,userEmail,phoneNumber,subject,message} = useSelector((state:ContactFormDataRedux)=> state.formData);
    console.log("Redux : ",firstName, lastName, userEmail, phoneNumber, subject, message);
    
    try {
     
      const contactFormData : FormData = {
        firstnameInput : firstNameRef.current.value,
        lastnameInput : lastNameRef.current.value,
        emailInput : emailRef.current.value,
        phoneInput : phoneRef.current.value,
        subjectInput : subjectRef.current.value,
        messageInput : messageRef.current.value,
      };

      // const createDocumentPromise  = databases.createDocument("65a0d58f05d18f1fd844","65a765dfe6039fba1743",ID.unique(),{
      //   firstname : contactFormData.firstnameInput,
      //   lastname : contactFormData.lastnameInput,
      //   email : contactFormData.emailInput,
      //   phone : contactFormData.phoneInput,
      //   subject : contactFormData.subjectInput,
      //   message : contactFormData.messageInput,
      // });
      const contactFormResponse = await databases.createDocument(
        "65a0d58f05d18f1fd844",
        "ContactFormDataCollection",
        ID.unique(),
        {
          // firstName: firstNameRef.current.value,
          // lastName: lastNameRef.current.value,
          // phoneNumber: phoneRef.current.value,
          // email :emailRef.current.value,
          // subject : subjectRef.current.value,
          // message : messageRef.current.value,
          firstName: "bala",
          lastName: "v",
          phoneNumber: "0987654321",
          email :"bala@gmail.com",
          subject : "hello",
          message :"subject",
        }
      );
      const serviceId = "service_8gpwtpa";
      const templateId = "template_ydb45th";
      const publicKey = "lOPJL4qloEffQEiAr";

      const mailData = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: contactFormData.firstnameInput + " " + contactFormData.lastnameInput,
          from_email: contactFormData.emailInput,
          to_name: "skillbridge",
          message: contactFormData.messageInput,
          subject: contactFormData.subjectInput,
        },
      };

      const mailSentResponse = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        mailData
      );

      contactDispatch(
        updateFormData({
          firstName: contactFormData.firstnameInput,
          lastName: contactFormData.lastnameInput,
          userEmail: contactFormData.emailInput,
          phoneNumber: contactFormData.phoneInput,
          subject: contactFormData.subjectInput,
          message: contactFormData.messageInput,

        })
      );

      toast.success("Submitted Successfully");
      console.log("Document created " ,contactFormResponse,"\n Email Response : " ,mailSentResponse);
      

    } catch (error) {
      alert('error');
      console.error(error);
    }
  }

  return (
    <>
      <div>
           {descriptionDocument ? (
          <section className="description_section container mt-5 mb-5 border-bottom">
          <div className="description_container row ">
            <h1 className="col-md-6 col-12">{descriptionDocument?.heading}</h1>
            <p className="col-md-6 col-12">{descriptionDocument?.content}</p>
          </div>
        </section>
        ):''} 
      </div>

      <div className="container">
        <div className="row row-cols-2 d-flex rounded bg-white p-2">
          <section className="contact col-12 col-md-8  p-4" id="form_section">
            <Form onSubmit={(e)=>handleSubmit} className="contactForm">
              <div className="row row-cols-md-2 ">
                <Form.Group className="mb-3" controlId="firstNameInput">
                  <Form.Label className="fw-medium">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    className="formInput"
                    name="firstname"
                    ref={firstNameRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastNameInput">
                  <Form.Label className="fw-medium">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    className="formInput"
                    name="lastname"
                    ref={lastNameRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="emailInput">
                  <Form.Label className="fw-medium">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    className="formInput"
                    name="userEmail"
                    ref={emailRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phoneInput">
                  <Form.Label className="fw-medium">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phonenumber"
                    className="formInput"
                    name="phone"
                    ref={phoneRef}
                    required
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="subjectInput">
                <Form.Label className="fw-medium">Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Subject"
                  className="formInput"
                  name="subject"
                  ref={subjectRef}
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="fw-medium">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your Message here..."
                  className="formInput"
                  name="message"
                  ref={messageRef}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="send_message_button border-0 justify-content-end text-white"
                >
                  Send Your Message
                  <ToastContainer />
                </Button>
              </div>
            </Form>
          </section>

          <section
            className="contact col-12 col-md-4 d-flex flex-column gap-3 p-lg-5 flex-wrap"
            id="contact_section"
          >
            <div className="card  p-2 p-lg-3  gap-2 d-flex  flex-column justify-content-center align-items-center">
              <button className="btn bg-light">
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
              <p>support@skillbridge.com</p>
            </div>

            <div className="card p-2 p-lg-3  gap-2 d-flex  flex-column justify-content-center align-items-center">
              <button className="btn bg-light">
                <FontAwesomeIcon icon={faPhone}/>
              </button>
              <p>+91 00000 00000</p>
            </div>

            <div className="card p-2 p-lg-3  gap-2 d-flex  flex-column justify-content-center align-items-center">
              <button className="btn bg-light">
                <FontAwesomeIcon icon={faLocationDot}/>
              </button>
              <p>Somewhere in the world</p>
            </div>

            <div className="card p-3  d-flex gap-2 justify-content-center align-items-center">
              <div className="socialMediaContainer d-flex gap-2">
                <button className="btn bg-light">
                  <FontAwesomeIcon icon={faFacebook}/>
                </button>
                <button className="btn bg-light">
                  <FontAwesomeIcon icon={faTwitter}/>
                </button>
                <button className="btn bg-light">
                  <FontAwesomeIcon icon={faLinkedin}/>
                </button>
              </div>
              <p>Social Profiles</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Contact;
