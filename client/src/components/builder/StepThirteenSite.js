import React, { Fragment } from "react";

const StepThirteenSite = ({ formData, clientValidation, onChange }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">
        Scrivi un breve testo che descriva la tua attività
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        Puoi scrivere quello che vuoi far sapere ai tuoi clienti, però ti
        consigliamo di soffermarti
      </p>

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
      <input
        type="button"
        onClick={() => clientValidation(formData.description)}
        className="btn btn-primary"
        value="Avanti"
      />
    </Fragment>
  );
};

export default StepThirteenSite;
