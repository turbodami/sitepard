import React, { useState, Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const Cover = ({ nextStep, prevStep }) => {
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
        <section className="section">
          <div className="container">
            <Nav prevStep={prevStep} />
            <div className="columns is-centered">
              <div className="column is-3"></div>
              <div className="column is-6 has-text-centered">
                <p className="title is-1">
                  Vuoi usare un'immagine di copertina?
                </p>
                <p className="subtitle is-3">
                  Se non hai foto della tua attività contattaci su Whatsapp,
                  Nico verrà a farle per te
                </p>
                <div className="buttons are-large is-centered has-text-centered">
                  <button
                    onClick={() => triggerCoverLoader(!showCoverLoader)}
                    className="button is-primary"
                  >
                    Si
                  </button>
                  <button
                    onClick={nextStep}
                    className="button is-primary"
                    value="no"
                  >
                    No
                  </button>
                </div>
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
        <Fragment>{showCoverLoader ? coverLoader : null}</Fragment>
      </Fragment>
    </animated.div>
  );
};

export default Cover;
