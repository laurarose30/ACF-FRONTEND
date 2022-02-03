import React, { useState } from "react";
import Register from "./Register";
import toastr from "toastr";
import "toastr/build/toastr.css";
import "./Style.css";
function Login(props) {
  
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
  console.log("submitted");
   e.preventDefault();
   toastr.warning("If you think your login permissions are incorrect, please contact admin");
   cDisabled(true);

   props.client
    .login(e.target.username.value,e.target.password.value)
    .then( (response) => {
      cDisabled(false);
      console.log(response.data.token);
      props.loggedIn(response.data.token, response.data.role);
      
    })
    
    .catch((error) => {
        alert("an error occurred, please try again")
        console.log(error);
        cDisabled(false);
    });
  };

  return (
    <>
      <br/>
      <br/>
      <br/>
      <div className="log">
      <div className="log-wrapper">
        <div className="log-inner">

          ACF Programme Login
          <br/>
          <br/>
      <form id ="loginform" onSubmit={(e) => submitHandler(e)}>
        

        username
        <br />
        <input type="text" name="username" disabled={disabled} />
        <br />
        password
        <br />
        <input type="password" name="password" disabled={disabled} />
        <br />
                <br />
        <button type="submit" disabled={disabled} value="login">
          {" "}
          Login{" "}
        </button>

        <button type="button" disabled={disabled} onClick={props.onRegister}>
          {" "}
          Register{" "}
        </button>
        <br/>
        <p>Please register before logging in!</p>
      </form>
      </div>
      </div>
      </div>

     
    </>
  );
}












export default Login;
