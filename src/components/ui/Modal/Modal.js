import React from "react";
import cssClasses from "./Modal.module.css";
import BackDrop from "../Backdrop/BackDrop";

const Modal = (props) => (
  <React.Fragment>
    <BackDrop click={props.modalClosed} show={props.show} />
    <div
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
      className={cssClasses.Modal}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;
