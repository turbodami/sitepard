import React, { Fragment, useEffect, useState } from "react";
import { getCurrentSite, addProduct } from "../../actions/site";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import Products from "../show/Products";

const StepTwoProduct = ({
  getCurrentSite,
  history,
  nextStep,
  addProduct,
  auth: { user },
  site: { site, loading },
}) => {
  const defaultState = {
    name: "",
    description: "",
    price: "",
    category: "",
    photo: "",
  };

  const [formData, setFormData] = useState(defaultState);

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
    <Fragment>
      <h1 className="large text-primary">Inserisci i prodotti</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Aggiungi i prodotti che vendi, con una foto, una descrizione e una
        categoria.
      </p>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addProduct(formData, history);
          setFormData(defaultState);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={formData.name}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            Questo nome sarà utilizzato per generare il sottodominio
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Descrizione"
            name="description"
            value={formData.description}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            Questo nome sarà utilizzato per generare il sottodominio
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            Questo nome sarà utilizzato per generare il sottodominio
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Prezzo"
            name="price"
            value={formData.price}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            Questo nome sarà utilizzato per generare il sottodominio
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Foto"
            name="photo"
            value={formData.photo}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            Questo nome sarà utilizzato per generare il sottodominio
          </small>
        </div>
        <input type="submit" className="btn btn-primary" value="Aggiungi" />
      </form>

      {site !== null ? (
        <Fragment>
          <Products product={site.products} />
        </Fragment>
      ) : (
        <Fragment>
          <h1>C'è qualche problema!</h1>
        </Fragment>
      )}

      <input
        type="button"
        onClick={nextStep}
        className="btn btn-primary"
        value="Avanti"
      />
    </Fragment>
  );
};

StepTwoProduct.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  site: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  site: state.site,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentSite,
  addProduct,
})(StepTwoProduct);
