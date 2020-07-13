import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Mobile from "../show/Mobile";
import ProductsList from "../show/ProductsList";
import { getCurrentSite } from "../../actions/site";
import AddCategory from "../site-forms/AddCategory";

const EditProducts = ({
  getCurrentSite,
  auth: { user },
  site: { site, loading },
}) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  const [modCatIsActive, toggleModCat] = useState(false);

  

  return loading && site === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {site !== null ? (
        <Fragment>
          <div className={ modCatIsActive? `modal is-active` : `modal`}>
            <div className="modal-background" onClick={() => toggleModCat(!modCatIsActive)}></div>
            <div className="modal-content">
              <div className="box">
                <AddCategory />
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => toggleModCat(!modCatIsActive)}></button>
          </div>

          

          <div className="columns">
            <div className="column is-8">
              <nav className="breadcrumb is-small" aria-label="breadcrumbs">
                <ul>
                  <li className="is-active">
                    <a href="#">Dashboard</a>
                  </li>
                  <li className="is-active">
                    <a href="#" aria-current="page">
                      Modifica prodotti
                    </a>
                  </li>
                </ul>
              </nav>
              <p className="title is-2">Gestione prodotti</p>
              
              <button className="button is-primary" onClick={() => toggleModCat(!modCatIsActive)}>Aggiungi categoria</button>
              <div className="box">
                <p className="title is-3 has-text-centered">Il mio menù</p>
                <ProductsList categories={site.categories} products={site.products} />
              </div>
            </div>
            <div className="column is-4">
              <Mobile url={site.url}/>
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
