import React from "react";
import cssClasses from "./NavigationItems.module.css";
import NavigationItem from './NavigationItem/NavigationItem';



const NavigationItems=()=>(
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem link="/" active={true}> Burger Builder </NavigationItem>
        <NavigationItem link="/" > Checkout </NavigationItem>
    </ul>
);

export default NavigationItems;
