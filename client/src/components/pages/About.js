import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import damiano from "../../images/damianopresa.jpg";
import nicola from "../../images/nicolaramoso.jpg";
import niccolo from "../../images/niccoloramponi.jpg";

import { useSpring, animated } from "react-spring";

const About = ({ isAuthenticated }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section is-medium">
          <div className="container">
            <div className="columns has-text-centered is-centered">
              
              <div className="column has-text-centered is-10">
                <p className="title is-1">
                   Chi siamo?
                </p>
                <p className="subtitle is-3">
                Siamo un gruppo di giovani programmatori veronesi, stiamo sviluppando questo strumento per facilitare la vita alle migliaia di pizzerie Venete che hanno bisogno di una presenza online. 
                </p>
              </div>
            </div>  
            <div className="columns is-centered">
              <div className="column is-3">
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img src={damiano} alt="Damiano Presa" />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      
                      <div class="media-content">
                        <p class="title is-4">Damiano Presa</p>
                        <p class="subtitle is-6">Sviluppatore full-stack</p>
                      </div>
                    </div>

                    <div class="content">
                      Cresciuto a pizza e codice, inventa di notte e costruisce di giorno. 
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img src={nicola} alt="Nicola Ramoso" />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">Nicola Ramoso</p>
                        <p class="subtitle is-6">Sviluppatore backend</p>
                      </div>
                    </div>
                      Leggasi Damiano Presa, con qualche kg in più e una spiccata predilezione per i server.
                    <div class="content">
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img src={niccolo} alt="Niccolò Ramponi" />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">Niccolò Ramponi</p>
                        <p class="subtitle is-6">Marketing guru</p>
                      </div>
                    </div>

                    <div class="content">
                      Già fondatore di <a href="https://www.lascienzainpalestra.it">La Scienza in Palestra</a> e <a href="https://www.fisioscience.it">FisioScience</a>, è appassionato di startup e digital marketing.
                    </div>
                  </div>
                </div>
              </div>
            </div>
              
           
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

About.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(About);
