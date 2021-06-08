import React from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./BitcoinValue.module.css";

const BitcoinValue = (props) => {





  
  const showCurrentPriceHandler = (event) => {
    event.preventDefault();
    console.log("pressing button works!");
    fetch("/currentPrice")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <Card customClassName={classes.bitcoin_current_price}>
      <label id="ageLabel" htmlFor="age">
        1 Bitcoin in $USD: {}
      </label>
      <p>Price placeholder</p>
      <Button buttonType="submit" onButtonClick={showCurrentPriceHandler}>
        Click to show current Bitcoin price
      </Button>
    </Card>
  );
};

export default BitcoinValue;
