import React, { Fragment, useState, useEffect } from "react";
import "../devices.min.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentSite } from "../../actions/site";

const Mobile = ({getCurrentSite, site: { site },}) => {

  const { categories, products } = site;

  useEffect(() => {
    
    getCurrentSite();
  }, [getCurrentSite]);

  /* useEffect(() => {
    console.log("dio cane ci sono2");
    if(document.getElementById('preview')){
      console.log(document.getElementById('preview'));
      console.log(document.getElementById('preview').contentWindow);
      document.getElementById('preview').contentWindow.location.reload(true);
    }  
  }, [categories, products]); */

  return (
    <Fragment>
      <div className="marvel-device iphone-x">
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
            id="preview"
            src={"http://" + site.subdomain + ".cactusdomaindev.xyz"}
            title="your website"
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