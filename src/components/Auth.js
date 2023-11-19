import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {

    const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8001/", { email, password }).then(res=>{
        if(res.data=="exist"){
            history("/gmail",{state:{id:email}})
        }
        else if(res.data=="notexist"){
            alert("User have not sign up")
        }
      })
      .catch(e=>{
        alert("wrong details")
        console.log(e);
      })
    } catch (e) {
      console.log(e);
    }
  }



  //goglelogin
//   const responseGoogle = (response) => {
//     console.log("Google login response:", response);
//     // Handle Google login response here
//   };

const responseGoogle = async (response) => {
    try {
      // Send the Google access token to your backend for validation
      const { tokenId } = response;
      const res = await axios.post("http://localhost:8001/googlelogin", {
        tokenId,
      });

      if (res.data === "success") {
        // Handle successful Google login on the frontend
        // For example, redirect to a different page or set user state
        history("/gmail", { state: { id: email } });
      } else {
        alert("Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed");
    }
  };

  const handleTraditionalLogin = async(e) => {
    e.preventDefault();
    // Handle traditional username and password login here
    // Get values from form fields using state or refs

    try {
        // Send email and password to your backend for authentication
        const res = await axios.post("http://localhost:8001/login", {
          email,
          password,
        });
  
        if (res.data === "success") {
          // Handle successful login
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed");
      }


  };

  return (
    <div className="container">
      <h2 className="write">Choose a Login Method</h2>
      <div className="form-container">
        <form onSubmit={handleTraditionalLogin}>
          <h3 className="login-here">Login Here</h3>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button type="submit" onClick={submit}>
            Login
          </button>
        </form>
      </div>
      <div>
        <div className="line">
          <div className="or">OR</div>
        </div>
      </div>
      <div className="google-login">
        <GoogleLogin
          className="google"
          clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google client ID
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={(error) => console.error("Google login error:", error)}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <button className="button-create">
        <Link to="/signup" className="link-signup">
          Create an Account
        </Link>
      </button>
    </div>
  );
};

export default LoginPage;
