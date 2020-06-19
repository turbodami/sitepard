import React, { useState, Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const StepSixSite = ({ nextStep, prevStep }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const logoLoader = (
    <animated.div style={props}>
      <Fragment>
        <div className="field">
          <div className="file is-large is-boxed">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Carica logo</span>
              </span>
            </label>
          </div>
        </div>

        <input
          type="button"
          onClick={nextStep}
          className="btn btn-primary"
          value="Avanti"
        />
      </Fragment>
    </animated.div>
  );

  const [showLogoLoader, triggerLogoLoader] = useState(false);

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section">
          <div className="container">
            <Nav prevStep={prevStep} />
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">
                <p className="title is-1">Hai un logo?</p>
                <p className="subtitle is-3">
                  Se non ce l'hai scrivici su Whatsapp, possiamo fartene uno!
                </p>
                <input
                  type="button"
                  onClick={() => triggerLogoLoader(!showLogoLoader)}
                  className="button is-primary"
                  value="si"
                />
                <input
                  type="button"
                  onClick={nextStep}
                  className="button is-primary"
                  value="no"
                />
                <Fragment>{showLogoLoader ? logoLoader : null}</Fragment>
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

export default StepSixSite;
