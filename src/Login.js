import React, { useState } from "react";
import loginPost from "./loginPost";
import { makeStyles, createStyles } from "@mui/styles";
import { Button, TextField, Typography } from "@mui/material";

const useStyles = makeStyles(() =>
  createStyles({
    login: {
      display: "block",
      width: "100%",
    },
    login_box: {
      margin: "auto",
      width: "350px",
    },
    login_box_body: {},
    form_group: {
      display: "flex",
      flexDirection: "column",
      margin: "10px 0",
    },
    button: {
      fontSize: "20px",
    },
  })
);

const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const handleFormSubmit = (e) => {
    loginPost(formData);
    console.log(formData);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.login}>
      <div className={classes.login_box}>
        <div className="login-box-header">
          <Typography variant="h4">Login</Typography>
        </div>
        <div className={classes.login_box_body}>
          <form>
            <div className={classes.form_group}>
              <TextField
                name="name"
                type="text"
                id="outlined-required"
                label="Name"
                defaultValue=""
                onChange={handleFormChange}
              />
            </div>
            <div className={classes.form_group}>
              <TextField
                name="password"
                type="password"
                id="outlined-required"
                label="Password"
                defaultValue=""
                onChange={handleFormChange}
              />
            </div>
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleFormSubmit}
            >
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
