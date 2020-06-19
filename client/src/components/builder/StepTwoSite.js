import React, { Fragment } from "react";
import Nav from "./Nav";
import { useSpring, animated } from "react-spring";

const StepTwoSite = ({ formData, clientValidation, onChange, prevStep }) => {
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
                <p className="title is-1">Qual'è il nome della tua attività?</p>
                <p className="subtitle is-3">
                  Scrivi come si chiama la tua impresa
                </p>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Nome"
                      name="name"
                      value={formData.name}
                      onChange={(e) => onChange(e)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => clientValidation(formData.name)}
                  >
                    Avanti
                  </button>
                </div>
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

export default StepTwoSite;
