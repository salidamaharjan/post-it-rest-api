import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  id: number;
};
function loggedInUser(): number {
  const token = localStorage.getItem("token");
  const decoded: TokenPayload = jwtDecode(token!);
  return decoded.id;
}

export default loggedInUser;
