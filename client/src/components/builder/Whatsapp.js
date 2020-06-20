import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const Whatsapp = ({ formData, clientValidation, onChange, prevStep }) => {
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
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6 has-text-centered">
                <p className="title is-1">
                  Su che numero Whatsapp vuoi ricevere gli ordini?
                </p>
                <p className="subtitle is-3">
                  I tuoi clienti ti manderanno direttamente li gli ordini
                </p>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Numero Whatsapp"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={(e) => onChange(e)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="field">
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => clientValidation(formData.whatsappNumber)}
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

export default Whatsapp;
