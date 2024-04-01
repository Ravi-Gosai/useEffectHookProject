import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: "false" };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: "false" };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredClg, setEnteredClg] = useState('');
  // const [clgIsValid, setClgIsValid] = useState()

  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(()=>{
  //   const indentifier = setTimeout(()=>{
  //     console.log('checking validity')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   },500);

  //   return ()=>{
  //     console.log('cleanUP')
  //     clearTimeout(indentifier)
  //   }
  // },[enteredEmail,enteredPassword])

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value });

    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"USER_INPUT", val: event.target.value });

    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  // const clgChangeHandler = (event) => {
  //   setEnteredClg(event.target.value);

  //   setFormIsValid(
  //     event.target.value.trim().length > 6 && enteredEmail.includes('@')
  //   );
  // };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  // const validateClgHandler = () => {
  //   setClgIsValid(enteredClg.includes('@'));
  // };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" type="email" label="E-mail" isValid={emailState.isValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}></Input>
        <Input id="password" type="password" label="Password" isValid={passwordState.isValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}></Input>
        
        {/* <div
          className={`${classes.control} ${
            clgIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="clg">College Name</label>
          <input
            type="text"
            id="clg"
            value={enteredClg}
            onChange={clgChangeHandler}
            onBlur={validateClgHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
