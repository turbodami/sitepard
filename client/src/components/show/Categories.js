import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCategory } from "../../actions/site";

const Categories = ({ category, deleteCategory }) => {
  const categories = category.map((cat) => (
    <Fragment>
      <tr key={cat._id}>
        <td>{cat.name}</td>

        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteCategory(cat._id)}
          >
            Elimina
          </button>
        </td>
      </tr>
    </Fragment>
  ));

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">Nome</th>
            <th />
          </tr>
        </thead>
        <tbody>{categories}</tbody>
      </table>
    </Fragment>
  );
};

Categories.propTypes = {
  category: PropTypes.array.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default connect(null, { deleteCategory })(Categories);
