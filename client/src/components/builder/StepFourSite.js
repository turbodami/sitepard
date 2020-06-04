import React, { Fragment } from "react";

const StepFourSite = ({ handleSelection }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Che stile vuoi utilizzare?</h1>
      <p className="lead">
        <i className="fas fa-user" /> Clicca sullo stile che ti piace di più
      </p>
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="style"
        value="frocio"
      />
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="style"
        value="clown"
      />
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="style"
        value="alcohol"
      />
    </Fragment>
  );
};

export default StepFourSite;
