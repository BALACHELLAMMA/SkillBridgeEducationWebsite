import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { account } from "../appwriteConfig.ts";

interface UserInfo {
  email: string;
  password: string;
  name?: string;
}

interface AuthContextProps {
  user: any;
  loginUser: (userInfo: UserInfo) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userInfo: UserInfo) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo: UserInfo) => {
    console.log("userInfo", userInfo);
    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
      console.log("Response:\n", response);

      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  const logoutUser = async () => {
    await account.deleteSession("current");
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  const registerUser = async (userInfo: UserInfo) => {
    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      console.log(response);
      

      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
  };
  const contextData: AuthContextProps = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

//Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
