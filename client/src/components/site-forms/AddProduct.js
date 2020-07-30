import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/site";
import { useSpring, animated } from "react-spring";

const AddProduct = ({ addProduct, history }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: ""
  });

  const { name, description, category, price } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <animated.div style={props}>
      <Fragment>
        <section className="section">
          <div className="container">
            
            <div className="columns is-centered">
              
              <div className="column">
                <p className="title is-1">Aggiungi Pizza</p>
                <p className="subtitle is-3">
                  Inserisci il nome, gli ingredienti e il prezzo
                </p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  addProduct(formData, history);
                }}>
                  <div className="field">
                    <label className="label">Nome</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Inserisci il nome"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Prezzo</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Inserisci prezzo in €"
                      name="price"
                      value={price}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Ingredienti</label>
                    <textarea 
                      className="textarea" 
                      placeholder="Scrivi gli ingredienti"
                      name="description"
                      value={description}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="submit"
                      className="button is-primary"
                      value="Aggiungi pizza"
                    />
                  </div>
                </form>
              </div>
              
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>



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
