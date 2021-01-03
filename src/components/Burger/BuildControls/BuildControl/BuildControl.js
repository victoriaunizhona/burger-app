import React from "react";

import cssClasses from "./BuildControl.module.css";


const BuildControl = (props) => (
    <div className={cssClasses.BuildControl}>
        <div className={cssClasses.Label}>{props.label}</div>
        <button disabled={props.disabledLess} onClick={props.removed} className={cssClasses.Less}>Less</button>
        <button onClick={props.added} className={cssClasses.More}>More</button>
    </div>
);

export default BuildControl;

