import React, { Fragment } from "react";

const Footer = () => {

  //redirect if logged in
  //if (isAuthenticated) {
  //return <Redirect to="/dashboard" />;
  //}

  return (
    <Fragment>
        <Fragment>
            <section className="hero is-medium is-info is-bold">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-vcentered is-centered mb-2">
                            <i class="fas fa-laptop-code"></i>
                            <h1 class="title is-1">Sitepard</h1>
                        </div>
                        <div className="columns is-vcentered is-centered">
                            <nav class=" is-spaced is-primary" role="navigation" aria-label="main navigation">
                                <div class="navbar-menu">
                                    <div class="navbar-start">
                                        <a class="navbar-item" href="/terms">Termini e Condizioni</a>
                                        <a class="navbar-item" href="/privacy">Privacy Policy</a>
                                        <a class="navbar-item" href="/contact">Contattaci</a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    </Fragment>
  );
};

export default Footer;