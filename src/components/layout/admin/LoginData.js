import { LogedIn } from "../../constants/icons";

export default function LogIn() {
  const loginInfo = localStorage.getItem("email");

  return (
    <div id="user" className="admin__logInfo">
      <LogedIn />
      <div>
        <p>You are logged in as:</p>
        <p>{loginInfo}</p>
      </div>
    </div>
  );
}
