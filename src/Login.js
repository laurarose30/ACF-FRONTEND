import React, { useState } from "react";

function Login(props) {
  
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
  console.log("submitted");
   e.preventDefault();
   cDisabled(true);

   props.client
    .login(e.target.username.value,e.target.password.value,e.target.role.value)
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
      Login
      <br />
      <form onSubmit={(e) => submitHandler(e)}>
        role
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
    </>
  );
}

export default Login;
