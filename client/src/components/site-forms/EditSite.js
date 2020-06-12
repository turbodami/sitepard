import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSite, getCurrentSite } from "../../actions/site";
import Alert from "../layout/Alert";

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
      <section className="container">
        <h1 className="large text-primary">Crea sito</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Inserisci le informazioni per il tuo
          sito
        </p>
        <small>* = obbligatorio</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <Alert />

          <div className="form-group">
            <input
              type="text"
              placeholder="Nome"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Inserisci il nome della tua attività
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Type"
              name="type"
              value={type}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Inserisci tipo</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Categoria"
              name="category"
              value={category}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Inserisci la categoria</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Telefono"
              name="tel"
              value={tel}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Inserisci il numero di telefono</small>
          </div>
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
              placeholder="Descrizione"
              name="description"
              value={description}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Aggiungi una descrizione che i tuoi clienti vedranno, ad esempio
              informazioni riguardo la consegna a domicilio.
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Indirizzo"
              name="address"
              value={address}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Inserisci l'indirizzo dell'attività
            </small>
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
      </section>
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
