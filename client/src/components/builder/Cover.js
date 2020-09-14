import React, { useState, Fragment } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "./Nav";
import { uploadImage } from "../../actions/site";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Cover = ({ formData, nextStep, prevStep, uploadImage }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const handleImage = async (e) => {
    function success(result) {
      console.log("immagine caricata");
    }
    function failure(error) {
      console.log("non ce la faccio zio :(");
    }
    
    const promise = uploadImage(formData, e.target.files[0], e.target.getAttribute('name'));
    promise.then(success, failure);
  }

  const coverLoader = (
    <animated.div style={props}>
      <Fragment>
          
        <div className="field">
          <div className="file is-boxed is-centered">
            <label className="file-label">
              <input className="file-input" type="file" name="dish1" onChange={handleImage}/>
              <span className="file-cta"> 
                <span className="file-label">Carica copertina</span>
              </span>
            </label>
          </div>
        </div>

        <div className="field">
          <div className="file is-boxed is-centered">
            <label className="file-label">
              <input className="file-input" type="file" name="dish2" onChange={handleImage}/>
              <span className="file-cta"> 
                <span className="file-label">Carica copertina</span>
              </span>
            </label>
          </div>
        </div>

        <div className="field">
          <div className="file is-boxed is-centered">
            <label className="file-label">
              <input className="file-input" type="file" name="dish3" onChange={handleImage}/>
              <span className="file-cta"> 
                <span className="file-label">Carica copertina</span>
              </span>
            </label>
          </div>
        </div>

        <div className="field">
          <div className="file is-boxed is-centered">
            <label className="file-label">
              <input className="file-input" type="file" name="dish4" onChange={handleImage}/>
              <span className="file-cta"> 
                <span className="file-label">Carica copertina</span>
              </span>
            </label>
          </div>
        </div>

        <div className="field">
          <div className="file is-boxed is-centered">
            <label className="file-label">
              <input className="file-input" type="file" name="dish5" onChange={handleImage}/>
              <span className="file-cta"> 
                <span className="file-label">Carica copertina</span>
              </span>
            </label>
          </div>
        </div>

        <div className="field">
          <div className="file is-boxed is-centered">
            <label className="file-label">
              <input className="file-input" type="file" name="env" onChange={handleImage}/>
              <span className="file-cta"> 
                <span className="file-label">Carica copertina</span>
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
                  Sarà l'immagine che i tuoi clienti vedranno per prima
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
                <Fragment>{showCoverLoader ? coverLoader : null}</Fragment>
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
        
      </Fragment>
    </animated.div>
  );
};

Cover.propTypes = {
  uploadImage: PropTypes.func.isRequired,
};

export default connect(null, { uploadImage})(Cover);
