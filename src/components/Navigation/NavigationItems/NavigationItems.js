import React from "react";
import cssClasses from "./NavigationItems.module.css";
import NavigationItem from './NavigationItem/NavigationItem';



const NavigationItems=()=>(
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem link="/"> Burger Builder </NavigationItem>
        <NavigationItem link="/orders" > Orders </NavigationItem>
    </ul>
);

export default NavigationItems;
