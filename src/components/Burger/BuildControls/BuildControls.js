import React from "react";
import cssClasses from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "Salad" },
  { label: "Bacon", type: "Bacon" },
  { label: "Cheese", type: "Cheese" },
  { label: "Meat", type: "Meat" },
];

const BuildControls = (props) => (
  <div className={cssClasses.BuildControls}>
    <p>Current price: <strong> {props.totalPrice.toFixed(2)} </strong></p>
    {controls.map((control) => (
      <BuildControl
        disabledLess={!props.ingredientsInfo[control.type]}
        removed={() => props.ingredientRemoved(control.type)}
        added={() => props.ingredientAdded(control.type)}
        key={control.label}
        label={control.label}
      />
    ))}
    <button onClick={props.ordered} disabled={!props.purchasable} className={cssClasses.OrderButton}>ORDER NOW</button>
  </div>
);
export default BuildControls;
