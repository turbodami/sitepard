import React, { Fragment } from "react";

const StepTenSite = ({ formData, clientValidation, onChange }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">A che numero vuoi che ti chiamino?</h1>
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
  );
};

export default StepTenSite;
