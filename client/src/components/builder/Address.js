import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const Address = ({ formData, clientValidation, prevStep, onChange }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
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
                <p className="title is-1">
                  Qual'è l'indirizzo della tua attività?
                </p>
                <p className="subtitle is-3">
                  Inserisci l'indirizzo completo della tua attività
                </p>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Via Hermann Goering, 17 Littoria (RO)"
                      name="address"
                      value={formData.address}
                      onChange={(e) => onChange(e)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => clientValidation(formData.address)}
                    value="Avanti"
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

export default Address;
