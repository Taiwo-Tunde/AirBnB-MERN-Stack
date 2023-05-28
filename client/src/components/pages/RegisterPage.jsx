import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };
  console.log(name, email, password);
  const handleMail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  function registerUser(e) {
    e.preventDefault();
    
    try {
       axios.post("/register", {
        name,
        email,
        password,
      });
      alert('Registration successfull. Now you can login ')
    } catch (e) {
      alert('Registration failed. Please try again later')
    }
  
  }

  return (
    <div
      className=" mt-4 grow flex items-center justify-around  "
      onSubmit={registerUser}
    >
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 ">Register</h1>
        <form className=" max-w-md mx-auto ">
          <input
            type="text"
            placeholder="Ente your Name"
            value={name}
            onChange={handleName}
          />

          <input
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            onChange={handleMail}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account ?{" "}
            <Link to={"/login"} className="underline text-black">
              {" "}
              Login{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
