import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct, deleteCategory } from "../../actions/site";

const Menu = ({ category, deleteCategory, product, deleteProduct }) => {
  const menu = category.map((cat) => (
    <Fragment>
      <table className="table">
        <thead>
          <tr key={cat.id}>
            <th className="hide-sm">{cat.name}</th>
            <th>
              <button
                className="btn btn-danger"
                onClick={() => deleteCategory(cat._id)}
              >
                Elimina
              </button>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {product.map(function (prod) {
            if (prod.category === cat.name) {
              return (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>{prod.description}</td>
                  <td>{prod.category}</td>
                  <td>{prod.price}</td>
                  <td>{prod.photo}</td>
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
