import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";

const StepEightSite = ({ formData, clientValidation, onChange }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={props}>
      <Fragment>
        <h1 className="large text-primary">
          Su che numero Whatsapp vuoi ricevere gli ordini?
        </h1>
        <p className="lead">
          <i className="fas fa-user" />I tuoi clienti ti manderanno direttamente
          li gli ordini
        </p>
        <div className="flex-center">
          <form className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Numero Whatsapp"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text">Scrivi il numero qui</small>
            </div>
            <input
              type="button"
              onClick={() => clientValidation(formData.whatsappNumber)}
              className="btn btn-primary"
              value="Avanti"
            />
          </form>
        </div>
      </Fragment>
    </animated.div>
  );
};

export default StepEightSite;
