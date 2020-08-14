import React, { Fragment, useState } from "react";

import { useSpring, animated } from "react-spring";

import { editPassword } from "../../actions/auth";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const EditAccount = ({editPassword, auth: { user }, history}) => {

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const defaultData = {
      password: '',
      password2: ''
  }

  const [formData, setFormData] = useState(defaultData);

  const changePassword = e => {
      e.preventDefault();
    const {password, password2} = formData;

    if(password===password2){
        
        const {password} = formData;
        if(user){
          editPassword(user.email, password, history);
        } else {
          console.log("danger guys")
        }

    }
  }
    const onChange = (e) => {
        e.persist();
    
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };  

  return (
    <Fragment>
      <div className="columns">
        <div className="column is-6">
          <nav className="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li className="is-active">
                <a href="#">Dashboard</a>
              </li>
              <li className="is-active">
                <a href="#" aria-current="page">
                  Modifica password
                </a>
              </li>
            </ul>
          </nav>
          <p className="title is-2">Cambio password</p>
          <p className="subtitle is-4">
            Inserisci qui di seguito la nuova password, poi clicca su "Cambia password"
          </p>
          <form onSubmit={(e) => changePassword(e)}>
                  
                  <div className="field">
                    <label className="label">Nuova password</label>
                    <input
                      className="input"
                      type="password"
                      placeholder="Inserisci nuova password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Conferma password</label>
                    <input
                      className="input"
                      type="password"
                      placeholder="Ripeti password"
                      name="password2"
                      value={formData.password2}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="field">
                    <input
                      type="submit"
                      className="button is-primary"
                      value="Cambia password"
                    />
                  </div>
                </form>
        </div>
      </div>
    </Fragment>
  );
};

EditAccount.propTypes = {
  editPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editPassword })(EditAccount);