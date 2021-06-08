import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.custom_button}
      type={props.buttonType || "button"}
      onClick={props.onButtonClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
