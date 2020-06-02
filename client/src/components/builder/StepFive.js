import React, { Fragment } from "react";

const StepOne = ({ formData, nextStep, onChange }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Qui ci sarà l'anteprima figa</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Haha dio merda
      </p>

      <input
        type="button"
        onClick={nextStep}
        className="btn btn-primary"
        value="Avanti"
      />
    </Fragment>
  );
};

export default StepOne;
