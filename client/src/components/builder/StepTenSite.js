import React, { Fragment } from "react";

import { setAlert } from "../../actions/alert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

const StepTenSite = ({ formData, setFormData, nextStep, setAlert }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const handleChange = (e) => {
    e.persist();

    setFormData({
      ...formData,
      timeTable: {
        ...formData.timeTable,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleTimeTable = () => {
    if (
      formData.timeTable.monday !== "" &&
      formData.timeTable.tuesday !== "" &&
      formData.timeTable.wednesday !== "" &&
      formData.timeTable.thursday !== "" &&
      formData.timeTable.friday !== "" &&
      formData.timeTable.saturday !== "" &&
      formData.timeTable.sunday !== ""
    ) {
      nextStep();
    } else {
      setAlert("Riempi tutti i campi di testo!", "danger");
    }
  };
  return (
    <animated.div style={props}>
      <Fragment>
        <h1 className="large text-primary">
          Quali sono i tuoi orari di apertura?
        </h1>
        <p className="lead">
          <i className="fas fa-user" />
          Inserisci i tuoi orari di apertura
        </p>
        <div className="flex-center">
          <form className="form">
            <div className="form-group left">
              <h4>Lunedì</h4>
              <input
                type="text"
                placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                name="monday"
                value={formData.timeTable.monday}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group left">
              <h4>Martedì</h4>
              <input
                type="text"
                placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                name="tuesday"
                value={formData.timeTable.tuesday}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group left">
              <h4>Mercoledì</h4>
              <input
                type="text"
                placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                name="wednesday"
                value={formData.timeTable.wednesday}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group left">
              <h4>Giovedì</h4>
              <input
                type="text"
                placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                name="thursday"
                value={formData.timeTable.thursday}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group left">
              <h4>Venerdì</h4>
              <input
                type="text"
                placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                name="friday"
                value={formData.timeTable.friday}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group left">
              <h4>Sabato</h4>
              <input
                type="text"
                placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                name="saturday"
                value={formData.timeTable.saturday}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group left">
              <h4>Domenica</h4>
              <input
                type="text"
                placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                name="sunday"
                value={formData.timeTable.sunday}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <input
              type="button"
              onClick={handleTimeTable}
              className="btn btn-primary"
              value="Avanti"
            />
          </form>
        </div>
      </Fragment>
    </animated.div>
  );
};

StepTenSite.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(StepTenSite);
