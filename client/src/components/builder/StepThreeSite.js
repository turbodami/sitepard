import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const StepThreeSite = ({ handleSelection, prevStep }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section">
          <div className="container">
            <Nav prevStep={prevStep} />
            <div className="columns is-centered">
              <div className="column is-3"></div>
              <div className="column is-6 has-text-centered">
                <p className="title is-1">Che colori ti piacciono?</p>
                <p className="subtitle is-3">
                  Clicca sui colori da usare per il tuo sito
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
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

export default StepThreeSite;
