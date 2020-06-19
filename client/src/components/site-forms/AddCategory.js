import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCategory } from "../../actions/site";
import { Link } from "react-router-dom";

const AddCategory = ({ addCategory, history }) => {
  const defaultData = {
    name: "",
  };
  const [formData, setFormData] = useState(defaultData);

  const { name } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <h1 className="large text-primary">Aggiungi una categoria</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i>
        Altre puttanate
      </p>
      <small>* = campi obbligatori</small>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCategory(formData, history);
          setFormData(defaultData);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Nome categoria"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  );
};

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
};

export default connect(null, { addCategory })(AddCategory);
