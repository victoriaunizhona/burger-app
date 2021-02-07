import React from "react";
import cssClasses from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses=[cssClasses.InputElement];

  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(cssClasses.Invalid)
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          value={props.value}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          value={props.value}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          value={props.value}
          className={inputClasses.join(' ')}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          value={props.value}
          className={cssClasses.InputElement}
          {...props.elementConfig}
        />
      );
  }
  return (
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
