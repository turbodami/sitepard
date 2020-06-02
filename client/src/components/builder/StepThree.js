import React, { Fragment } from "react";

const StepThree = ({ handleSelection }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Che colori ti piacciono?</h1>
      <p className="lead">
        <i className="fas fa-user" /> Clicca sui colori da usare per il tuo sito
      </p>
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="palette"
        value="giallo/merda"
      />
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="palette"
        value="verde/piscio"
      />
      <input
        type="button"
        onClick={(e) => handleSelection(e)}
        className="btn btn-primary"
        name="palette"
        value="bianco/sborra"
      />
    </Fragment>
  );
};

export default StepThree;
