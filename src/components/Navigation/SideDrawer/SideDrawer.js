import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import cssClasses from "./SideDrawer.module.css";
import BackDrop from "../../ui/Backdrop/BackDrop";

const SideDrawer = (props) => {
  const attachedClasses = [cssClasses.SideDrawer];
  props.show
    ? attachedClasses.push(cssClasses.Open)
    : attachedClasses.push(cssClasses.Close);

  return (
    <React.Fragment>
      <BackDrop show={props.show} click={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
