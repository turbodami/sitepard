import React, { useState, Fragment } from "react";
import { useSpring, animated } from "react-spring";

const StepSevenSite = ({ handleSelection, nextStep }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

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
    <animated.div style={props}>
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
    </animated.div>
  );
};

export default StepSevenSite;
