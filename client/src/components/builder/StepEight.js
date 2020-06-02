import React, { useState, Fragment } from "react";

const StepEight = ({ handleSelection, nextStep }) => {
  const coverLoader = (
    <Fragment>
      <form className="form">
        <div className="form-group">
          <h1>IMAGELOADER</h1>
          <small className="form-text">
            Carica la tua immagine di copertina qui
          </small>
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

  const [showCoverLoader, triggerCoverLoader] = useState(false);

  return (
    <Fragment>
      <h1 className="large text-primary">
        Vuoi usare un'immagine di copertina?
      </h1>
      <p className="lead">
        <i className="fas fa-user" /> Se non hai foto della tua attività
        contattaci su Whatsapp, Nico verrà a farle per te
      </p>
      <input
        type="button"
        onClick={() => triggerCoverLoader(!showCoverLoader)}
        className="btn btn-primary"
        value="si"
      />
      <input
        type="button"
        onClick={nextStep}
        className="btn btn-primary"
        value="no"
      />
      <Fragment>{showCoverLoader ? coverLoader : null}</Fragment>
    </Fragment>
  );
};

export default StepEight;
