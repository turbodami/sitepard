import React, { Fragment } from "react";

const StepTwelveSite = ({ formData, clientValidation, onChange }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">
        Qual'è l'indirizzo della tua attività?
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        Inserisci l'indirizzo completo della tua attività
      </p>
      <div className="flex-center">
        <form className="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Via Hermann Goering, 17 Littoria (RO)"
              name="address"
              value={formData.address}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Sarà visibile dai tuoi clienti</small>
          </div>
          <input
            type="button"
            onClick={() => clientValidation(formData.address)}
            className="btn btn-primary"
            value="Avanti"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default StepTwelveSite;
