import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Mobile from "../show/Mobile";
import Menu from "../show/Menu";
import { getCurrentSite } from "../../actions/site";
import AddProduct from "../site-forms/AddProduct";
import AddCategory from "../site-forms/AddCategory";

const EditProducts = ({
  getCurrentSite,
  auth: { user },
  site: { site, loading },
}) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  const modal = (
    <Fragment>
      <div className="modal">
        <div className="modal-background"></div>
        <div className="modal-content">
          <AddProduct />
        </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    </Fragment>
  );

  const [modalActive, toggleModal] = useState(false);

  return loading && site === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {site !== null ? (
        <Fragment>
          <Fragment>{modalActive ? modal : null}</Fragment>

          <div className="columns">
            <div className="column is-8">
              <nav class="breadcrumb is-small" aria-label="breadcrumbs">
                <ul>
                  <li class="is-active">
                    <a href="#">Dashboard</a>
                  </li>
                  <li class="is-active">
                    <a href="#" aria-current="page">
                      Modifica prodotti
                    </a>
                  </li>
                </ul>
              </nav>
              <p className="title is-2">Gestione prodotti</p>
              <AddCategory />
              <Menu category={site.categories} product={site.products} />
            </div>
            <div className="column is-4">
              <Mobile />
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>C'è qualche problema!</p>
        </Fragment>
      )}
    </Fragment>
  );
};

EditProducts.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
});

export default connect(mapStateToProps, {
  getCurrentSite,
})(EditProducts);
