import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const Category = ({ handleSelection }) => {
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
            <nav
              className="navbar"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-menu">
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      <Link to="/">
                        <a className="delete is-large"></a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="columns is-centered">
              <div className="column is-3"></div>
              <div className="column is-6 has-text-centered">
                <p className="title is-1">Che attività svolgi?</p>
                <p className="subtitle is-3">
                  Clicca sulla categoria a cui ti associ di più
                </p>
                <input
                  type="button"
                  onClick={(e) => handleSelection(e)}
                  className="button is-primary"
                  name="category"
                  value="pizzeria"
                  placehol
                />
              </div>
              <div className="column is-3" />
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

export default Category;
