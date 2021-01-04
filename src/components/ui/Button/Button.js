import React from "react";
import cssClasses from './Button.module.css'

const Button = (props) => (
    <button className={[cssClasses.Button, cssClasses[props.type]].join(' ')} onClick={props.clicked}>{props.children}</button>
);

export default Button;
