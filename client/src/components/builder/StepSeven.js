import React, { useState, Fragment } from "react";

const StepSeven = ({ handleSelection, nextStep }) => {
  const logoLoader = (
    <Fragment>
      <form className="form">
        <div className="form-group">
          <h1>LOGOLOADER</h1>
          <small className="form-text">Carica il tuo logo qui</small>
        </div>
        <input
          type="button"
          onClick={nextStep}
          className="btn btn-primary"
          value="Avanti"
        />
      </form>
    </Fragment>
  );

  const [showLogoLoader, triggerLogoLoader] = useState(false);

  return (
    <Fragment>
      <h1 className="large text-primary">Hai un logo?</h1>
      <p className="lead">
        <i className="fas fa-user" /> Se non ce l'hai scrivici su Whatsapp,
        Niccolò lo farà per te!
      </p>
      <input
        type="button"
        onClick={() => triggerLogoLoader(!showLogoLoader)}
        className="btn btn-primary"
        value="si"
      />
      <input
        type="button"
        onClick={nextStep}
        className="btn btn-primary"
        value="no"
      />
      <Fragment>{showLogoLoader ? logoLoader : null}</Fragment>
    </Fragment>
  );
};

export default StepSeven;
