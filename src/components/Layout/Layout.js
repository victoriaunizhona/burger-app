import React from "react";
import cssClasses from "./Layout.module.css";


const   Layout = (props) => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <div className={cssClasses.Content}>{props.children}</div>
  </React.Fragment>
);

export default Layout;

