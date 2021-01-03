import React from "react";
import cssClasses from "./BackDrop.module.css";

const BackDrop = (props) =>
  props.show ? (
    <div onClick={props.click} className={cssClasses.BackDrop} />
  ) : null;

export default BackDrop;
