import React from "react";
import burgerLogo  from '../../assets/images/burger-logo.png';
import cssClasses from './Logo.module.css'

const Logo = (props) =>(
    <div className={cssClasses.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Burger"/>
    </div>
);

export default Logo;
