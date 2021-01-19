import React from "react";
import Burger from "../../Burger/Burger";
import Button from '../../ui/Button/Button';
import cssClasses from './CheckoutSummary.module.css'


const CheckoutSummary = (props) => {
  return (
    <div className={cssClasses.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%",  margin: "auto" }}>
        <Burger ingredients={props.ingredients}/>
      </div>
        <Button clicked={props.onCheckoutCancelled} type={'Danger'}>CANCEL</Button>
        <Button clicked={props.onCheckoutContinued} type={'Success'}>CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;
