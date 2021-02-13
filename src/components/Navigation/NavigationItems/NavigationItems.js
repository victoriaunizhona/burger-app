import React from "react";
import cssClasses from "./NavigationItems.module.css";
import NavigationItem from './NavigationItem/NavigationItem';



const NavigationItems=(props)=>(
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem link="/"> Burger Builder </NavigationItem>
        {props.isAuthenticated && <NavigationItem link="/orders" > Orders </NavigationItem>}
        {!props.isAuthenticated ?  <NavigationItem link="/auth" > Auth </NavigationItem> :  <NavigationItem link="/logout" > Logout </NavigationItem>}

    </ul>
);

export default NavigationItems;
