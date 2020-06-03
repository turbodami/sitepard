import React, { Fragment } from "react";

const StepTwoSite = ({ formData, clientValidation, onChange }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Qual'è il nome della tua attività?</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Scrivi come si chiama la tua impresa
      </p>

      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={formData.name}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            Questo nome sarà utilizzato per generare il sottodominio
          </small>
        </div>
        <input
          type="button"
          onClick={() => clientValidation(formData.name)}
          className="btn btn-primary"
          value="Avanti"
        />
      </form>
    </Fragment>
  );
};

export default StepTwoSite;
