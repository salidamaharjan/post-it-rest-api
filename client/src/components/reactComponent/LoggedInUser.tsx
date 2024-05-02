import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

type LoggedInUserProps = {
  clientId: number;
  children: React.ReactNode;
};
export function LoggedInUser({ children, clientId }: LoggedInUserProps) {
  const loggedInUserState = useContext(UserContext);
  console.log(loggedInUserState?.loggedInUserId);
  return (
    <div>
      {loggedInUserState?.loggedInUserId === undefined ||
      loggedInUserState?.loggedInUserId !== clientId ? (
        <></>
      ) : (
        children
      )}
    </div>
  );
}
