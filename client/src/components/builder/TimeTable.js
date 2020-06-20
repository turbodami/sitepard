import React, { Fragment } from "react";

import { setAlert } from "../../actions/alert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

import Nav from "./Nav";

const TimeTable = ({ formData, setFormData, nextStep, prevStep, setAlert }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
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
        <section className="section">
          <div className="container">
            <Nav prevStep={prevStep} />
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">
                <p className="title is-1">
                  Quali sono i tuoi orari di apertura?
                </p>
                <p className="subtitle is-3">
                  Inserisci i tuoi orari di apertura
                </p>

                <div className="field">
                  <label className="label">Lunedì</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                    name="monday"
                    value={formData.timeTable.monday}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="field">
                  <label className="label">Martedì</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                    name="tuesday"
                    value={formData.timeTable.tuesday}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="field">
                  <label className="label">Mercoledì</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                    name="wednesday"
                    value={formData.timeTable.wednesday}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="field">
                  <label className="label">Giovedì</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                    name="thursday"
                    value={formData.timeTable.thursday}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="field">
                  <label className="label">Venerdì</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                    name="friday"
                    value={formData.timeTable.friday}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="field">
                  <label className="label">Sabato</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                    name="saturday"
                    value={formData.timeTable.saturday}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="field">
                  <label className="label">Domenica</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Per esempio scrivi: 8:00-12:00 / 15:00-21:00"
                    name="sunday"
                    value={formData.timeTable.sunday}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="field">
                  <input
                    type="button"
                    className="button is-primary"
                    onClick={handleTimeTable}
                    value="Avanti"
                  />
                </div>
              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </animated.div>
  );
};

TimeTable.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(TimeTable);
