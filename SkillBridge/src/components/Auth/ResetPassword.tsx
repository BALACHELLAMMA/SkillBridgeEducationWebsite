import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwriteConfig";

interface passwordType {
  newPassword: string;
  currentPassword: string;
}

interface userEmailType {
  newUserEmail: string;
  newUserName: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setpassword] = useState<passwordType>({
    newPassword: "",
    currentPassword: "",
  });
  const [userEmail, setUserEmail] = useState<userEmailType>({
    newUserEmail: "",
    newUserName: "",
  });

  const changeUserEmail = async (e) => {
    e.preventDefault();
    try {
      const updateUserEmailPromise = await account.updateEmail(
        userEmail.newUserEmail,
        'bala@123'
      );
      console.log("Updated Password Response", updateUserEmailPromise);
      const updateUserName = await account.updateName(userEmail.newUserName);
      console.log("Updated User Name", updateUserName);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const updatePasswordPromise = await account.updatePassword(
        password.newPassword,
        password.currentPassword
      );
      console.log("Updated Password Response", updatePasswordPromise);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container-xl p-3 my-5 border">
        <h2 className="text-center"> Reset your password </h2>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter your new password :
            </label>
            <input
              required
              type="password"
              name="password"
              onChange={(e) => {
                setpassword({
                  ...password,
                  newPassword: e.target.value,
                });
              }}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              current password :
            </label>
            <input
              required
              type="password"
              name="password"
              onChange={(e) => {
                setpassword({
                  ...password,
                  currentPassword: e.target.value,
                });
              }}
              className="form-control"
              id="exampleInputPassword2"
            />
          </div>
          <button
            className="btn btn-success"
            type="submit"
            onClick={(e) => changePassword(e)}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
