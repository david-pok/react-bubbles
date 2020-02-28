import React, { useState } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      width: 200,
      margin: "auto"
    }
  },

  formItems: {
    marginTop: 5
  }
}));

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const classes = useStyles();
  const [creds, setCreds] = useState({ username: "", password: "" });

  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    console.log("creds on post", creds);
    e.preventDefault();
    axiosWithAuth()
      .post("/login", creds)
      .then(res => {
        console.log("response", res);
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => console.log("ERROR: ", err));
  };

  return (
    <div className={classes.root}>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login} className={classes.form} autoComplete="off">
        <TextField
          className={classes.formItems}
          label="Username"
          name="username"
          value={creds.username || ""}
          onChange={handleChange}
        />
        <TextField
          className={classes.formItems}
          type="password"
          label="Password"
          name="password"
          value={creds.password || ""}
          onChange={handleChange}
        />
        <Button
          className={classes.formItems}
          type="submit"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
