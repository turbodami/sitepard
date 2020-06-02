import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct } from "../../actions/site";

const Products = ({ product, deleteProduct }) => {
  const products = product.map((prod) => (
    <Fragment>
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
    </Fragment>
  ));

  return (
    <Fragment>
      <h2 className="my-2"> I miei prodotti</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">Nome</th>
            <th className="hide-sm">Descrizione</th>
            <th className="hide-sm">Prezzo</th>
            <th className="hide-sm">Foto</th>
            <th />
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </table>
    </Fragment>
  );
};

Products.propTypes = {
  product: PropTypes.array.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

export default connect(null, { deleteProduct })(Products);
