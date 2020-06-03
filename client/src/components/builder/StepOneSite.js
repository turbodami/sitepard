import React, { Fragment } from "react";

const StepOneSite = ({ handleSelection }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Che attività svolgi?</h1>
      <p className="lead">
        <i className="fas fa-user" /> Clicca sulla categoria a cui ti associ di
        più
      </p>
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="category"
        value="pizzeria"
      />
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="category"
        value="ristorante"
      />
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="category"
        value="bar"
      />
    </Fragment>
  );
};

export default StepOneSite;
