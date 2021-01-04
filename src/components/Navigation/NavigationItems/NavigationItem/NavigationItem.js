import React from "react";
import cssClasses from "./NavigationItem.module.css";

const NavigationItem = (props) => (
  <li className={cssClasses.NavigationItem}>
    <a className={props.active ? cssClasses.active : null} href="./">
    {props.children}
    </a>
  </li>
);

export default NavigationItem;

