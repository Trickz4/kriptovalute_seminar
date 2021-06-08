import React from "react";
import Button from "../UI/Button";

import Card from "../UI/Card";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const addUserHandler = (event) => {
    event.preventDefault();
    console.log("pressing button works!");
  };

  return (
    <Card customClassName={classes.user_input}>
      <form>
        <label htmlFor="username">Name</label>
        <input id="username"></input>
        <label id="ageLabel" htmlFor="age">
          Age (Years)
        </label>
        <input id="age" type="number"></input>
        <Button buttonType="submit" onButtonClick={addUserHandler}>
          Add user
        </Button>
      </form>
    </Card>
  );
};

export default AddUser;
