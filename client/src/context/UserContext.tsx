import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext<UserLoggedInState | null>(null);

type UserContextProps = {
  children: React.ReactNode;
};
type TokenPayload = {
  id: number;
};

type UserLoggedInState = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUserId: number | undefined;
};
export function UserContextProvider({ children }: UserContextProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedInUserId, setIsLoggedInUserId] = useState<number | undefined>();
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decoded: TokenPayload = jwtDecode(token!);
      if (decoded) {
        setIsLoggedIn(true);
        setIsLoggedInUserId(decoded.id);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setIsLoggedInUserId(undefined);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, loggedInUserId }}>
      {children}
    </UserContext.Provider>
  );
}
