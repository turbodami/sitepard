import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct, deleteCategory } from "../../actions/site";
import AddProduct from "../site-forms/AddProduct";

const Menu = ({ categories, deleteCategory, products, deleteProduct }) => {
  
  const menu = categories.map((cat) => (
    <Fragment>
      
      <table className="table">
        <thead>
          <tr key={cat._id}>
            <th>{cat.name}</th>
            <th>
              <button
                onClick={() => deleteCategory(cat._id)}
              >
                Elimina
              </button>
            </th>
            <th>
              <AddProduct />
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map(function(prod) {

            if (prod.category === cat.name) {
              return (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>{prod.description}</td>
                  
                  <td>{prod.price}</td>
                  
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(prod._id)}
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </Fragment>
  ));

  return <Fragment>{menu}</Fragment>;
};

Menu.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory, deleteProduct })(Menu);
