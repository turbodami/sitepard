import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const Tel = ({ formData, clientValidation, prevStep, onChange }) => {
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
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6 has-text-centered">
                <p className="title is-1">
                  Che numero di telefono vuoi utilizzare?
                </p>
                <p className="subtitle is-3">
                  Il tuo numero sarà visibile per le chiamate
                </p>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Numero Whatsapp"
                      name="tel"
                      value={formData.tel}
                      onChange={(e) => onChange(e)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => clientValidation(formData.tel)}
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

export default Tel;
