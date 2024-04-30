import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
type SignedInProps = {
  children: React.ReactNode;
};

export function SignedIn({ children }: SignedInProps) {
  const userLoggedInState = useContext(UserContext);
  return (
    <div>{userLoggedInState?.isLoggedIn === true ? children : <></>}</div>
  );
}
