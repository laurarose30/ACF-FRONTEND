import React, { useState } from "react";

function Login(props) {
  
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
  console.log("submitted");
   e.preventDefault();
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
      
      Welcome to the ACF login page (if you do not have a login please speak to your Instructors)
      <br />
      <br/>
      <div className="log">
      <div className="log-wrapper">
        <div className="log-inner">
      <form id ="loginform" onSubmit={(e) => submitHandler(e)}>
        Role
        <br/>
        { <input type="text" name="role" disabled={disabled} /> }
        <br/> 

        username
        <br />
        <input type="text" name="username" disabled={disabled} />
        <br />
        password
        <br />
        <input type="password" name="password" disabled={disabled} />
        <br />
                <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Login{" "}
        </button>
      </form>
      </div>
      </div>
      </div>
    </>
  );
}

export default Login;
