import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";

const StepNineSite = ({ formData, clientValidation, onChange }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={props}>
      <Fragment>
        <h1 className="large text-primary">
          A che numero vuoi che ti chiamino?
        </h1>
        <p className="lead">
          <i className="fas fa-user" /> Riceverai le telefonate su questo numero
        </p>
        <div className="flex-center">
          <form className="form single">
            <div className="form-group">
              <input
                type="text"
                placeholder="Numero di telefono"
                name="tel"
                value={formData.tel}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text">Scrivi il numero qui</small>
            </div>
            <input
              type="button"
              onClick={() => clientValidation(formData.tel)}
              className="btn btn-primary"
              value="Avanti"
            />
          </form>
        </div>
      </Fragment>
    </animated.div>
  );
};

export default StepNineSite;
