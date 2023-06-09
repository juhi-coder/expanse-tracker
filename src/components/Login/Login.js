import React, { useRef } from "react";
import classes from "./Login.module.css";

import ForgetPassword from "../ForgetPassword/Forgetpassword";
import { useSelector, useDispatch } from "react-redux";
import { AuthSliceAction } from "../../store/Auth";
import { useHistory } from "react-router-dom";
const AuthForm = () => {
  const History = useHistory();
  const Dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const isForgetpassword = useSelector((state) => state.auth.isForgetpassword);

  const loginURL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTThTF2bZBEybWGDxdJF9j6pEtGVzXUrY";
  const signupUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTThTF2bZBEybWGDxdJF9j6pEtGVzXUrY";
  const RestUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBTThTF2bZBEybWGDxdJF9j6pEtGVzXUrY";
  const enteredEmail = useRef(null);
  const enteredPassword = useRef(null);
  const enteredconfirmPassword = useRef(null);
  let Error;
  const SubmitHandler = async (event) => {
    event.preventDefault();
    let obj = {
      email: enteredEmail.current.value,
      password: enteredPassword.current.value,
      returnSecureToken: true,
    };
    if (!isLogin && obj.password !== enteredconfirmPassword.current.value) {
      return;
    }
    try {
      const response = await fetch(isLogin ? loginURL : signupUrl, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      } else {
        !isLogin && Dispatch(AuthSliceAction.setisLogin());

        if (isLogin) {
          localStorage.setItem("id", data.idToken);
          localStorage.setItem("islogin", "true");
          localStorage.setItem("mailid", obj.email);
          Dispatch(AuthSliceAction.setLoginsate(data.idToken));
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const authChangeHandler = () => {
    Dispatch(AuthSliceAction.setisLogin());
  };
  const ForgetButtonHandler = () => {
    console.log("ForgetButtonHandlerr");

    Dispatch(AuthSliceAction.setisForgetpassword());
  };

  let submitButton;
  if (isLogin && !isForgetpassword) {
    submitButton = "Login";
  }
  if (!isLogin) {
    submitButton = "SignUp";
  }
  if (!isLogin && isForgetpassword) {
    submitButton = "Click to Reset";
  }
  const ForgetPasswordHandler = async () => {
    History.push("/loading");
    let obj = {
      requestType: "PASSWORD_RESET",
      email: enteredEmail.current.value,
    };
    History.push("/loading");
    try {
      const response = await fetch(RestUrl, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      } else {
        History.push("/login");
        Dispatch(AuthSliceAction.setisLogin());
        alert("User has successfully signed up.");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <React.Fragment>
      <div className={classes["main-container"]}>
        <div className={classes["email-container"]}>
          <h1>{isLogin && "Login"}</h1>
          <h1>{!isLogin && !isForgetpassword && "Create Account"}</h1>
          <h1>{isForgetpassword && !isLogin && "Reset Password"}</h1>
          <form className={classes["form-email"]} onSubmit={SubmitHandler}>
            <input
              type="email"
              placeholder="enter your mailid"
              ref={enteredEmail}
            ></input>

            {!isForgetpassword && (
              <input
                type="password"
                placeholder="enter your password"
                ref={enteredPassword}
              ></input>
            )}

            {!isLogin && !isForgetpassword && (
              <input
                type="password"
                placeholder="confirm password"
                ref={enteredconfirmPassword}
              ></input>
            )}
            {!isForgetpassword ? (
              <button type="submit">{submitButton}</button>
            ) : (
              <button type="button" onClick={ForgetPasswordHandler}>
                Click TO Reset
              </button>
            )}
          </form>
          <button onClick={authChangeHandler} className={classes.toggle}>
            {isLogin && "Create new account"}
            {!isLogin && !isForgetpassword && "Login with existing account"}
          </button>

          <ForgetPassword
            name={
              !isForgetpassword
                ? "forget password"
                : "Login with existing account"
            }
            className={classes.toggle}
            onhandleclick={ForgetButtonHandler}
          ></ForgetPassword>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthForm;