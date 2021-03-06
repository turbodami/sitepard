import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/site";
import { useSpring, animated } from "react-spring";

const ModalProd = ({addProduct, history, cat}) => {
    const style = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 500 },
    });

    const defaultData = {
        name: "",
        description: "",
        category: cat.name,
        price: ""
    }

    const [formData, setFormData] = useState(defaultData);
    
    const { name, description, price } = formData;

    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
    });

    return (  
        <animated.div style={style}>
            <Fragment>
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => document.getElementById(cat._id).remove()}></div>
                    <div className="modal-content">
                        <div className="box">
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
                                                console.log(formData);
                                                addProduct(formData, history);
                                                setFormData(defaultData);
                                                document.getElementById(cat._id).remove();
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
                        </div>  
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => document.getElementById(cat._id).remove()}></button>
                </div>
            </Fragment>
        </animated.div>
    )
};


ModalProd.propTypes = {
    addProduct: PropTypes.func.isRequired,
};
  
export default connect(null, { addProduct })(ModalProd);
  