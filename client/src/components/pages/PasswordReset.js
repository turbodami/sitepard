import React, { Fragment, useState } from "react";

import { useSpring, animated } from "react-spring";

import { passwordReset } from "../../actions/auth";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const PasswordReset = ({passwordReset}) => {
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
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const {password} = formData;
        if(token){
            passwordReset(token, password);
        } else {
            ("dio ti azzanna");
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
    <animated.div style={props}>
      <Fragment>
        <section className="section">
          <div className="container">
            
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">
                <p className="title is-1">c4mb14 p455w0rD</p>
                <p className="subtitle is-3">
                  Inserisci la nuova password, poi inserisci di nuovo la password. La password non può essere la password prima di questa password.
                  Ora inserisci la password.
                </p>
                <form onSubmit={(e) => changePassword(e)}>
                  
                  <div className="field">
                    <label className="label">Password</label>
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
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

PasswordReset.propTypes = {
    passwordReset: PropTypes.func.isRequired,
};
  
export default connect(null, { passwordReset })(PasswordReset);
  