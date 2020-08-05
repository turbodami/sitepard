import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const Domain = ({ handleSelection, prevStep }) => {
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
                <p className="title is-1">Che tipo di dominio vuoi utilizzare?</p>
                <p className="subtitle is-3">
                  Puoi scegliere tra sottodominio e dominio
                </p>
                <input
                  type="button"
                  onClick={(e) => handleSelection(e)}
                  className="button is-info"
                  name="type"
                  value="subdomain"
                />
                <input
                  type="button"
                  onClick={(e) => handleSelection(e)}
                  className="button is-info"
                  name="type"
                  value="domain"
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

export default Domain;
