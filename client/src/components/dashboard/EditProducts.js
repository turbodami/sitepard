import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Mobile from "../show/Mobile";
import { deleteProduct, deleteCategory } from "../../actions/site";
import { getCurrentSite } from "../../actions/site";
import AddCategory from "../site-forms/AddCategory";
import AddProduct from "./AddProduct";

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
      <div className="container">
        <table className="table">
          <thead>
            <tr key={cat._id}>
              <th>{cat.name}</th>
              <th>
                <div className="buttons">
                  <button className="button is-danger"
                    onClick={() => deleteCategory(cat._id)}
                  >
                    Elimina
                  </button>
                
                  <button className="button is-primary" cat={cat.name} onClick={(e) => triggerAddProduct(e)}>Aggiungi pizza</button>
                </div>
              </th>
              
            </tr>
          </thead>
          <tbody>
            {products.map(function(prod) {

              if (prod.category === cat.name) {
                return (
                  <tr key={prod._id}>
                    <td>
                      <button className="delete is-small" aria-label="close" onClick={() => deleteProduct(prod._id)}></button>
                    </td>
                    <td>{prod.name}</td>
                    <td>{prod.description}</td>
                    
                    <td>{prod.price}</td>
                    
                    
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  )});

  const 
  const prodProps = {

  }
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

          <div className={ modProdIsActive? `modal is-active` : `modal`}>
            <div className="modal-background" onClick={() => toggleModProd(!modProdIsActive)}></div>
            <div className="modal-content">
              <div className="box">
                <AddProduct {...prodProps}/>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => toggleModProd(!modProdIsActive)}></button>
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
                {list}
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
