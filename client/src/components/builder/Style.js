import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";

const Style = ({ handleSelection, prevStep }) => {
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
                <p className="title is-1">Che stile vuoi utilizzare?</p>
                <p className="subtitle is-3">
                  Clicca sullo stile che ti piace di più
                </p>
                <input
                  type="button"
                  onClick={(e) => handleSelection(e)}
                  className="btn btn-primary"
                  name="style"
                  value="frocio"
                />
                <input
                  type="button"
                  onClick={(e) => handleSelection(e)}
                  className="btn btn-primary"
                  name="style"
                  value="clown"
                />
                <input
                  type="button"
                  onClick={(e) => handleSelection(e)}
                  className="btn btn-primary"
                  name="style"
                  value="alcohol"
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

export default Style;
