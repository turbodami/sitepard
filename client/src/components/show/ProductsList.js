import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct, deleteCategory } from "../../actions/site";
import AddProduct from "../site-forms/AddProduct";

const ProductsList = ({ categories, deleteCategory, products, deleteProduct }) => {
  const [modProdIsActive, toggleModProd] = useState(false);

  const list = categories.map((cat) => (
    <Fragment>
      <div className={ modProdIsActive? `modal is-active` : `modal`}>
            <div className="modal-background" onClick={() => toggleModProd(!modProdIsActive)}></div>
            <div className="modal-content">
              <div className="box">
                <AddProduct cat={cat} />
              </div>  
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => toggleModProd(!modProdIsActive)}></button>
      </div>
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
                
                  <button className="button is-primary" onClick={() => toggleModProd(!modProdIsActive)}>Aggiungi pizza</button>
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
  ));

  return <Fragment>{list}</Fragment>;
};

ProductsList.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory, deleteProduct })(ProductsList);
