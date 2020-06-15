import React, { Fragment, useEffect, useState } from "react";
import { getCurrentSite, addCategory } from "../../actions/site";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import Menu from "../show/Menu";

const StepOneProduct = ({
  getCurrentSite,
  history,
  nextStep,
  addCategory,
  auth: { user },
  site: { site, loading },
}) => {
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
    <Fragment>
      <h1 className="large text-primary">Crea il tuo menù</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Crea le categorie per i tuoi prodotti, poi aggiungili al posto giusto.
      </p>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addCategory(formData, history);
          setFormData(defaultState);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Category"
            name="name"
            value={formData.name}
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
          <Menu category={site.categories} product={site.product} />
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

StepOneProduct.propTypes = {
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
})(StepOneProduct);
