import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
type SignedOutProps = {
  children: React.ReactNode;
};

export function SignedOut({ children }: SignedOutProps) {
  const userLoggedInState = useContext(UserContext);
  return (
    <div>{userLoggedInState?.isLoggedIn === false ? children : <></>}</div>
  );
}
