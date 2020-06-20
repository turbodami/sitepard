import React, { Fragment, useEffect, useState } from "react";
import { getCurrentSite, addCategory } from "../../actions/site";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import Menu from "../show/Menu";

import { useSpring, animated } from "react-spring";

const Products = ({
  getCurrentSite,
  history,
  nextStep,
  addCategory,
  auth: { user },
  site: { site, loading },
}) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const defaultState = {
    name: "",
  };

  const [formData, setFormData] = useState(defaultState);

  const name = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  return loading && site === null ? (
    <Spinner />
  ) : (
    <animated.div style={props}>
      <Fragment>
        <input
          type="button"
          onClick={nextStep}
          className="btn btn-primary"
          value="Avanti"
        />
      </Fragment>
    </animated.div>
  );
};

Products.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  site: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  site: state.site,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentSite,
  addCategory,
})(Products);
