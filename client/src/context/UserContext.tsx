import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext<UserLoggedInState | null>(null);

type UserContextProps = {
  children: React.ReactNode;
};

type UserLoggedInState = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
export function UserContextProvider({ children }: UserContextProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token!);
      if (decoded) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
