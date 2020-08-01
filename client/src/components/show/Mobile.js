import React, { Fragment, useState, useEffect } from "react";
import "../devices.min.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentSite } from "../../actions/site";

const Mobile = ({getCurrentSite, site: { site },}) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  const [random, setRandom] = useState({random: 0});

  useEffect(() => {
    setRandom({
      random: random+1
    });
  }, [site]);
  
  return (
    <Fragment>
      <div className="marvel-device iphone-x">
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="bottom-bar"></div>
        <div className="volume"></div>
        <div className="overflow">
          <div className="shadow shadow--tr"></div>
          <div className="shadow shadow--tl"></div>
          <div className="shadow shadow--br"></div>
          <div className="shadow shadow--bl"></div>
        </div>
        <div className="inner-shadow"></div>
        <div className="screen">
          <iframe
            src={"http://" + site.domain + ".cactusdomaindev.xyz"}
            title="your website"
            key={random}
            height="100%"
            width="100%"
          ></iframe>
        </div>
      </div>
    </Fragment>
  );
};

Mobile.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, {
  getCurrentSite,
})(Mobile);