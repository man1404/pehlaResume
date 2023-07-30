import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .get("http://localhost:4000/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            history("/Form", { state: { id: email } });
          } else if (res.data == "notexist") {
            alert("User have not sign up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login-container">
      <form class="form" action="POST">
        <p class="title">Login </p>

        <label>
          <input
            required=""
            for="email"
            type="email"
            class="input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required=""
            placeholder=""
            type="password"
            class="input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>Password</span>
        </label>

        <Link to="/Form" onClick={submit} type="submit" class="submit">
          Submit
        </Link>
        <p> Dont have an account ?</p>
        <Link to="/signup" class="submitt">
          {" "}
          Signup Here{" "}
        </Link>
      </form>
    </div>
  );
}

export default Login;
