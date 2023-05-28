import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  async function login(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        { withCredentials: true },
        { email, password }
      );
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      className=" mt-4 grow flex items-center justify-around  "
      onSubmit={login}
    >
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 ">login</h1>
        <form className=" max-w-md mx-auto ">
          <input
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            onChange={handleEmail}
          ></input>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
          ></input>

          <button className="primary">login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have account yet?{" "}
            <Link to={"/register"} className="underline text-black">
              {" "}
              Register Now{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
