import React, { useState, Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";
import { uploadCover } from "../../actions/site";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Cover = ({ formData, nextStep, prevStep, uploadCover }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });


  const [cover, setCover] = useState({
    cover: null
  });

  const handleUpload = (e) => {
    
    setCover({
      cover: e.target.files[0]
    });
    
  }

  const sendCover = async () => {
    function successCallback(result) {
      nextStep();
    }
    function failureCallback(error) {
      console.log("error");
    }

    const promise = uploadCover(formData, cover, nextStep);
    promise.then(successCallback, failureCallback);
  }

  const coverLoader = (
    <animated.div style={props}>
      <Fragment>
        <div className="field">
          <div className="file is-large is-boxed">
            <label className="file-label">
              <input className="file-input" type="file" name="file" onChange={handleUpload}/>
              <span className="file-cta"> 
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Carica immagine di copertina</span>
              </span>
            </label>
          </div>
        </div>

        <input
          type="button"
          onClick={() => {
            sendCover();
          }}
          className="btn btn-primary"
          value="Avanti"
        />
      </Fragment>
    </animated.div>
  );

  const [showCoverLoader, triggerCoverLoader] = useState(false);

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
                  Vuoi usare un'immagine di copertina?
                </p>
                <p className="subtitle is-3">
                  Se non hai foto della tua attività contattaci su Whatsapp,
                  Nico verrà a farle per te
                </p>
                <div className="buttons are-large is-centered has-text-centered">
                  <button
                    onClick={() => triggerCoverLoader(!showCoverLoader)}
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
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
        <Fragment>{showCoverLoader ? coverLoader : null}</Fragment>
      </Fragment>
    </animated.div>
  );
};

Cover.propTypes = {
  uploadCover: PropTypes.func.isRequired,
};

export default connect(null, { uploadCover})(Cover);
