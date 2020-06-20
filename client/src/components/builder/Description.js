import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const Description = ({ formData, clientValidation, prevStep, onChange }) => {
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
                  Scrivi un breve testo che descriva la tua attività
                </p>
                <p className="subtitle is-3">
                  Puoi scrivere quello che vuoi far sapere ai tuoi clienti, però
                  ti consigliamo di soffermarti
                </p>
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea"
                      value={formData.description}
                      name="description"
                      onChange={(e) => onChange(e)}
                      required
                      placeholder="Per esempio: 'Solo asporto e consegna a domicilio durante il periodo COVID-19. Dal venerdì alla domenica, ordini telefonici dalle ore 16:00, ordini su Whatsapp a qualsiasi ora."
                      rows="10"
                    ></textarea>
                  </div>
                </div>
                <div className="field">
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => clientValidation(formData.description)}
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

export default Description;
