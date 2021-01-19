import React from "react";
import cssClasses from "./NavigationItem.module.css";
import { NavLink } from 'react-router-dom'

const NavigationItem = (props) => (
  <li className={cssClasses.NavigationItem}>
    <NavLink exact activeClassName={cssClasses.active} to={props.link}>
    {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;

