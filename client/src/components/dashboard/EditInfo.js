import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSite, getCurrentSite } from "../../actions/site";
import Mobile from "../show/Mobile";

import "../devices.min.css";

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
    piva: "",
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
      piva: loading || !site.piva ? "" : site.piva,
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
    piva,
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
        <div className="column is-6">
          <nav className="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li className="is-active">
                <a href="#">Dashboard</a>
              </li>
              <li className="is-active">
                <a href="#" aria-current="page">
                  Modifica informazioni
                </a>
              </li>
            </ul>
          </nav>
          <p className="title is-2">Informazioni</p>
          <form onSubmit={(e) => onSubmit(e)}>

            <div className="field">
              <label className="label">Numero di telefono</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Telefono"
                  name="tel"
                  value={tel}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Numero di Whatsapp</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Whatsapp"
                  name="whatsappNumber"
                  value={whatsappNumber}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Indirizzo</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Indirizzo"
                  name="address"
                  value={address}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Partita IVA</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Partita IVA"
                  name="piva"
                  value={piva}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Descrizione</label>
              <div className="control">
                <textarea
                  className="textarea"
                  type="text"
                  placeholder="Descrizione"
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <div className="buttons">
                  <input
                    type="submit"
                    value="Salva"
                    className="button is-primary "
                  />
                  <Link className="button is-danger " to="/dashboard">
                    Indietro
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div className="column is-6 has-text-centered">
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
