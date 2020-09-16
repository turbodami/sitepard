import React, { useState, Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";
import { uploadLogo } from "../../actions/site";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Logo = ({ formData, nextStep, prevStep, uploadLogo }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const handleImage = (e) => {

    function success(result) {
      console.log("immagine caricata");
    }
    function failure(error) {
      console.log("immagine non caricata");
    }

    const promise = uploadLogo(formData, logo, nextStep);
    promise.then(success, failure);
  }

  const logoLoader = (
    <animated.div style={props}>
      <Fragment>
        <div className="field">
          <div className="file is-boxed is-centered">
            <label className="file-label">
              <input className="file-input" type="file" name="file" onChange={handleImage}/>
              <span className="file-cta"> 
                <span className="file-label">Carica logo</span>
              </span>
            </label>
          </div>
        </div>

        <input
          type="button"
          onClick={() => {
            nextStep();
          }}
          className="button is-info"
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
            <div className="columns is-centered">
              <div className="column is-3"></div>
              <div className="column is-6 has-text-centered">
                <p className="title is-1">Hai un logo?</p>
                <p className="subtitle is-3">
                  Se non ce l'hai scrivici su Whatsapp, possiamo fartene uno!
                </p>
                <div className="buttons are-large is-centered has-text-centered">
                  <button
                    onClick={() => triggerLogoLoader(!showLogoLoader)}
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

Logo.propTypes = {
  uploadLogo: PropTypes.func.isRequired,
};

export default connect(null, { uploadLogo})(Logo);