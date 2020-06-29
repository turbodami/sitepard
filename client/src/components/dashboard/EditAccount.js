import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSite, getCurrentSite } from "../../actions/site";
import Alert from "../layout/Alert";

const EditAccount = ({
  site: { site, loading },
  createSite,
  getCurrentSite,
  history,
}) => {
  const [siteData, setSiteData] = useState({
    category: "",
    name: "",
    tel: "",
    whatsappNumber: null,
    palette: null,
    style: null,
    description: "",
    image: "",
    logo: "",
    address: "",
    type: "",
  });

  useEffect(() => {
    getCurrentSite();
    setSiteData({
      category: loading || !site.category ? "" : site.category,
      name: loading || !site.name ? "" : site.name,
      tel: loading || !site.tel ? "" : site.tel,
      whatsappNumber:
        loading || !site.whatsappNumber ? "" : site.whatsappNumber,
      palette: loading || !site.palette ? "" : site.palette,
      style: loading || !site.style ? "" : site.style,
      description: loading || !site.description ? "" : site.description,
      image: loading || !site.image ? "" : site.image,
      logo: loading || !site.logo ? "" : site.logo,
      address: loading || !site.address ? "" : site.address,
      type: loading || !site.type ? "" : site.type,
    });
  }, [loading]);

  const {
    category,
    name,
    tel,
    whatsappNumber,
    palette,
    style,
    description,
    image,
    logo,
    address,
    type,
  } = siteData;

  const onChange = (e) =>
    setSiteData({ ...siteData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(siteData);
    createSite(siteData, history, true);
  };

  return (
    <Fragment>
      <div className="columns">
        <div className="column is-4">
          <nav className="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li className="is-active">
                <a href="#">Dashboard</a>
              </li>
              <li className="is-active">
                <a href="#" aria-current="page">
                  Modifica account
                </a>
              </li>
            </ul>
          </nav>
          <p className="title is-2">Gestisci account</p>
          <p className="subtitle is-4">
            Mandaci una mail per cambiare password. Vogliamo la password.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

EditAccount.propTypes = {
  createSite: PropTypes.func.isRequired,
  getCurrentSite: PropTypes.func.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, { createSite, getCurrentSite })(
  withRouter(EditAccount)
);
