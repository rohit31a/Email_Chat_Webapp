
import React, { useState } from "react";
import axiox from "axios";
import { useNavigate ,Link} from "react-router-dom";

const handleTraditionalLogin = (e) => {
  e.preventDefault();
  // Handle traditional username and password login here
  // Get values from form fields using state or refs
};

const Signup = () => {

    const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axiox.post("http://localhost:8001/signup", { email, password }).then(res=>{
        if(res.data=="exist"){
            alert("User already exist")
        }
        else if(res.data=="notexist"){
            history("/gmail",{state:{id:email}})
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

  return (
    <div className="container">
      <h2 className="write">Create an Account</h2>
      <div className="form-container">
        <form onSubmit={handleTraditionalLogin}>
          <h3 className="login-here">Sign Up Here</h3>
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
            placeholder="Create Password"
          />
          {/* <Link to ='/'><button type="submit" onClick={submit} >Sign up</button></Link> */}
          <button type ="submit" onClick={submit} className="button-create">
        <Link to="/" className="link-signup">
          Sign Up
        </Link>
      </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
