import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSite, getCurrentSite } from "../../actions/site";
import Alert from "../layout/Alert";
import Mobile from "../show/Mobile";

const EditInfo = ({
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
          <nav class="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li class="is-active">
                <a href="#">Dashboard</a>
              </li>
              <li class="is-active">
                <a href="#" aria-current="page">
                  Modifica stile
                </a>
              </li>
            </ul>
          </nav>
          <p className="title is-2">Stile</p>
          <form onSubmit={(e) => onSubmit(e)}>
            <Alert />

            <div className="form-group">
              <input
                type="number"
                placeholder="Palette"
                name="palette"
                value={palette}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text">Inserisci i colori</small>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Stile"
                name="style"
                value={style}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text">Inserisci lo stile</small>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Logo"
                name="logo"
                value={logo}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text">
                Inserisci qui il logo, se ne hai uno
              </small>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="image"
                name="image"
                value={image}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text">
                Inserisci un'immagine di copertina per il sito
              </small>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-white my-1" to="/dashboard">
              Go Back
            </Link>
          </form>
        </div>

        <div className="column is-4"></div>
        <div className="column is-4">
          <Mobile />
        </div>
      </div>
    </Fragment>
  );
};

EditInfo.propTypes = {
  createSite: PropTypes.func.isRequired,
  getCurrentSite: PropTypes.func.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, { createSite, getCurrentSite })(
  withRouter(EditInfo)
);
