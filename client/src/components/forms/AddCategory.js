import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCategory } from "../../actions/site";
import { useSpring, animated } from "react-spring";

const AddCategory = ({ addCategory, history, toggleModCat, addCatModalIsActive }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

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
    
      <animated.div style={props}>
      <Fragment>
        <section className="section">
          <div className="container">
            
            <div className="columns is-centered">
              
              <div className="column">
                <p className="title is-1">Aggiungi una categoria</p>
                <p className="subtitle is-3">
                  (Per esempio: Pizze bianche)
                </p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  addCategory(formData, history);
                  setFormData(defaultData);
                  toggleModCat(!addCatModalIsActive);
                  window.location.reload();
                }}>
                  <div className="field">
                    <label className="label">Categoria</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="Nome categoria"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="submit"
                      className="button is-primary"
                      value="Aggiungi"
                    />
                  </div>
                </form>
              </div>
              
            </div>
          </div>
        </section>
      </Fragment>
      </animated.div>
    
  );
};

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
};

export default connect(null, { addCategory })(AddCategory);
