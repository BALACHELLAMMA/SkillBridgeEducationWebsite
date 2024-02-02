import React, { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  firstnameInput: string;
  lastnameInput: string;
  emailInput: string;
  phoneInput: string;
  subjectInput: string;
  messageInput: string;
}
function Testing() {

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
   
    try {
      const contactFormData: FormData = {
        firstnameInput: firstNameRef.current.value,
        lastnameInput: lastNameRef.current.value,
        emailInput: emailRef.current.value,
        phoneInput: phoneRef.current.value,
        subjectInput: subjectRef.current.value,
        messageInput: messageRef.current.value,
      };


      console.log(contactFormData);
      toast.success("success");
    }
    catch(error){
      console.error(error);
    }
  }    
  return (
    <div>
      <form onSubmit={(e)=>handleSubmit}>
        <input type='text' ref={firstNameRef}/>
        <input type='text' ref={lastNameRef}/>
        <input type='text' ref={emailRef}/>
        <input type='text' ref={phoneRef}/>
        <input type='text' ref={subjectRef}/>
        <input type='text' ref={messageRef}/>
        <button type='submit'>send message
        <ToastContainer/>
        </button>
      </form>
    </div>
  )
}

export default Testing
