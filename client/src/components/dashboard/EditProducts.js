import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Mobile from "../show/Mobile";
import { deleteProduct, deleteCategory } from "../../actions/site";
import { getCurrentSite } from "../../actions/site";
import AddCategory from "../forms/AddCategory";
import AddProduct from "../forms/AddProduct";

const EditProducts = ({
  getCurrentSite,
  deleteCategory,
  deleteProduct,
  auth: { user },
  site: { site, loading },
}) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  const { categories, products } = site;

  const [currentCat, setCat] = useState(''); 

  const [addCatModalIsActive, toggleModCat] = useState(false);

  const catProps = {addCatModalIsActive, toggleModCat};

  const [addProdModalIsActive, toggleModProd] = useState(false);

  const prodProps = {addProdModalIsActive, toggleModProd, currentCat};

  const triggerAddProduct = (e) => {
    setCat(e.target.getAttribute('cat'));
    toggleModProd(!addProdModalIsActive);
  }

  const list = categories.map((cat) => {

    return (
    <Fragment>
      <div className="box" key={cat._id}>
        <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="title is-4">{cat.name}</p>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="buttons">
                  <button className="button is-danger"
                    onClick={() => deleteCategory(cat._id)}
                  >
                    Elimina
                  </button>
                
                  <button className="button is-primary" cat={cat.name} onClick={(e) => triggerAddProduct(e)}>Aggiungi pizza</button>
                </div>
              </div>
            </div>
          </nav>

          <div class="divider"></div>

        {products.map(function(prod) {
          if(prod.category === cat.name) {
            return (
              <div className="columns" key={prod._id}>
                <div className="column is-1">
                  <button className="delete is-small" aria-label="close" onClick={() => deleteProduct(prod._id)}></button>
                </div>
                <div className="column is-3">
                  <p className="title is-6">{prod.name}</p>
                </div>
                <div className="column is-7">
                  <p>{prod.description}</p>
                </div>
                <div className="column is-1">
                  <p>€ {prod.price}</p>
                </div>
              </div>
            )
          }  
        })}
      </div>
    </Fragment>
  )});

  return loading && site === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {site !== null ? (
        <Fragment>
          <div className={ addCatModalIsActive? `modal is-active` : `modal`}>
            <div className="modal-background" onClick={() => toggleModCat(!addCatModalIsActive)}></div>
            <div className="modal-content">
              <div className="box">
                <AddCategory {...catProps}/>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => toggleModCat(!addCatModalIsActive)}></button>
          </div>

          <div className={ addProdModalIsActive? `modal is-active` : `modal`}>
            <div className="modal-background" onClick={() => toggleModProd(!addProdModalIsActive)}></div>
            <div className="modal-content">
              <div className="box">
                <AddProduct {...prodProps}/>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => toggleModProd(!addProdModalIsActive)}></button>
          </div>

          

          <div className="columns">
            <div className="column is-6">
              <nav className="breadcrumb is-small" aria-label="breadcrumbs">
                <ul>
                  <li className="is-active">
                    <a href="#">Dashboard</a>
                  </li>
                  <li className="is-active">
                    <a href="#" aria-current="page">
                      Il mio menù
                    </a>
                  </li>
                </ul>
              </nav>
              <p className="title is-2">Il mio menù</p>
              <div className="buttons">
                <button className="button is-primary" onClick={() => toggleModCat(!addCatModalIsActive)}>Aggiungi categoria</button>
              </div>
              
              {list}
              
            </div>
            <div className="column is-6 has-text-centered">
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
  deleteCategory: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
});

export default connect(mapStateToProps, {
  getCurrentSite,
  deleteCategory, 
  deleteProduct
})(EditProducts);
