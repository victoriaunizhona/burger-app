import React from "react";
import cssClasses from './Button.module.css'

const Button = (props) => {
    return (
        <button disabled={props.disabled} className={[cssClasses.Button, cssClasses[props.type]].join(' ')} onClick={props.clicked}>{props.children}</button>
    );
};

export default Button;
