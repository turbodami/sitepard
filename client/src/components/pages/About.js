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
                Siamo un gruppo di giovani programmatori veronesi, stiamo sviluppando questo strumento per facilitare la vita alle migliaia di pizzerie che hanno bisogno di una presenza online. 
                </p>
              </div>
            </div>  
          </div>
          <div className="container">
            <div className="columns has-text-centered is-centered">
              <div className="column has-text-centered is-10">
                <p className="title is-1">Il team</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-3">
                <div className="card">
                  <div className="card-image">
                    
                  </div>
                  <div className="card-content">
                    <div className="media">
                      
                      <div className="media-content">
                        <p className="title is-4">Damiano Presa</p>
                        <p className="subtitle is-6">Sviluppatore full-stack</p>
                      </div>
                    </div>
                    <div className="content">
                      Cresciuto a pizza e codice, inventa di notte e costruisce di giorno. 
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="card">
                  <div className="card-image">
                    
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">Nicola Ramoso</p>
                        <p className="subtitle is-6">Sviluppatore backend</p>
                      </div>
                    </div>
                      Leggasi Damiano Presa, con qualche kg in più e una spiccata predilezione per i server.
                      <br />
                      <br />
                    <div className="content">
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="card">
                  <div className="card-image">
                    
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">Niccolò Ramponi</p>
                        <p className="subtitle is-6">Marketing guru</p>
                      </div>
                    </div>

                    <div className="content">
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
