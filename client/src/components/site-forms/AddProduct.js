import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/site";

const AddProduct = ({ addProduct, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    photo: "",
  });

  const { name, description, category, price, photo } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <h1 className="large text-primary">Aggiungi un prodotto</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i>
        Inserisci le informazioni per i tuoi clienti
      </p>
      <small>* = campi obbligatori</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addProduct(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Nome prodotto"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Prezzo"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={category}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            cols="30"
            rows="5"
            placeholder="Descrizione prodotto"
          ></textarea>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Foto prodotto"
            name="photo"
            value={photo}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-white my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default connect(null, { addProduct })(AddProduct);
