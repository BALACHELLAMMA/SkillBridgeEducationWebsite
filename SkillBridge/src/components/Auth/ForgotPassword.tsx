import { ToastContainer, toast } from "react-toastify";
import { account } from "../../appwriteConfig";
import { useRef } from "react";

const ForgotPassword = () => {
    const forgotPasswordRef = useRef(null);

    const handleForgotPassword = async(e)=>{
     try{

         e.preventDefault();
         const userEmail = forgotPasswordRef.current.value;
   
         if (userEmail && userEmail.includes('@')) {
           await account.createRecovery(
             userEmail,
             "http://localhost:5173/resetPassword"
             // navigate('/home')
           );
         // await account.createVerification('http://localhost:5173/resetPassword');
     
           toast.success(`Email has been sent!`);
         } else {
           toast.error(`Please enter your email!`);
         }
     }
     catch(error){
        console.log(error);
     }
    } 
  return (
    <div>
      <div className="container-xl p-3 my-5 border">
        <h2 className="text-center"> Verification Email </h2>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter your mail id for verification :
            </label>
            <input
              required
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail"
              ref={forgotPasswordRef}
            />
          </div>
          <button className="btn btn-success" type="submit" onClick={(e)=>handleForgotPassword}>
            send verification link
            <ToastContainer/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
