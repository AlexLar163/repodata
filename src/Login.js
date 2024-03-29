import React, { useState } from "react";
import loginPost from "./loginPost";
import { makeStyles, createStyles } from "@mui/styles";
import { Button, TextField, Typography } from "@mui/material";

const useStyles = makeStyles(() =>
  createStyles({
    login: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100wh",
      height: "100vh",
    },
    login_box: {
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

const Login = ({ children }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [loged, setLoged] = useState(false);
  const handleFormSubmit = (e) => {
    loginPost(formData).then((res) => {
      // console.log(res);
      res.statusCode === 200 && setLoged(true);
    });
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return !loged ? (
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
  ) : (
    children
  );
};

export default Login;
