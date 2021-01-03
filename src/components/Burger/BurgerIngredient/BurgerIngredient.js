import React from "react";
import cssClasses from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const BurgerIngredient = (props) => {

  return (
    <React.Fragment>
      <div className={cssClasses[props.type]}>
      {props.type === "BreadTop" && (
        <div>
          <div className={cssClasses.Seeds1} />
          <div className={cssClasses.Seeds2} />
        </div>
      )}
      </div>
    </React.Fragment>
  );
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
