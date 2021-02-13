import React from "react";
import cssClasses from "./Toolbar.module.css";
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerIcon from '../../ui/HamburgerIcon/HamburgerIcon';

const Toolbar = (props) => {
    return(
        <header className={cssClasses.Toolbar}>
            <HamburgerIcon clicked={props.toggleSideDrawer} open={props.showSideDrawer}/>
            <Logo height='80%'/>
            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    )

};

export default Toolbar;
