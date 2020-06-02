import React, { Fragment } from "react";

const StepNine = ({ formData, clientValidation, onChange }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">
        Su che numero Whatsapp vuoi ricevere gli ordini?
      </h1>
      <p className="lead">
        <i className="fas fa-user" />I tuoi clienti ti manderanno direttamente
        li gli ordini
      </p>

      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
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
    </Fragment>
  );
};

export default StepNine;
