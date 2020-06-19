import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSite, getCurrentSite } from "../../actions/site";
import Alert from "../layout/Alert";

import "../devices.min.css";
import { Columns, Content } from "react-bulma-components";

const EditSite = ({
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
      <Columns>
        <Columns.Column size={4}>
          <Content>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Nome"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Tipo sito</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={type}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Tipo attività</label>
                <div className="control">
                  <div className="select">
                    <select>
                      <option>Pizzeria</option>
                      <option>Ristorante</option>
                      <option>Bar</option>
                    </select>
                  </div>
                </div>
              </div>

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
            </form>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-white my-1" to="/dashboard">
              Go Back
            </Link>
          </Content>

          <form className="form" onSubmit={(e) => onSubmit(e)}>
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
          </form>
        </Columns.Column>
        <Columns.Column size={4}></Columns.Column>
        <Columns.Column size={4}>
          <Content>
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
                <h1>mmm</h1>
              </div>
            </div>
          </Content>
        </Columns.Column>
      </Columns>
    </Fragment>
  );
};

EditSite.propTypes = {
  createSite: PropTypes.func.isRequired,
  getCurrentSite: PropTypes.func.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, { createSite, getCurrentSite })(
  withRouter(EditSite)
);
