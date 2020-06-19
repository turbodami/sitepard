import React, { Fragment } from "react";
import { useSpring, animated } from "react-spring";

const StepTwelveSite = ({ formData, clientValidation, onChange }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={props}>
      <Fragment>
        <h1 className="large text-primary">
          Scrivi un breve testo che descriva la tua attività
        </h1>
        <p className="lead">
          <i className="fas fa-user" />
          Puoi scrivere quello che vuoi far sapere ai tuoi clienti, però ti
          consigliamo di soffermarti
        </p>
        <div className="flex-center">
          <form className="form">
            <div className="form-group">
              <div className="form-group">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => onChange(e)}
                  cols="30"
                  rows="5"
                  placeholder="Per esempio: 'Solo asporto e consegna a domicilio durante il periodo COVID-19. Dal venerdì alla domenica, ordini telefonici dalle ore 16:00, ordini su Whatsapp a qualsiasi ora.'"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <input
          type="button"
          onClick={() => clientValidation(formData.description)}
          className="btn btn-primary"
          value="Avanti"
        />
      </Fragment>
    </animated.div>
  );
};

export default StepTwelveSite;
