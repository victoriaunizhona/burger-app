import React from "react";
import cssClasses from "./HamburgerIcon.module.css";


const HamburgerIcon = (props) => {
    return(
    <div onClick={() => {
        props.clicked();
    }} className={[cssClasses.NavIcon, props.open ? cssClasses.open: null].join(' ')}>
        <span/>
        <span/>
        <span/>
    </div>
    )
};

export default HamburgerIcon;

