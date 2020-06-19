import React, { Fragment } from "react";

const StepDomain = ({ finalSubmit }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">
        Che tipo di dominio vuoi utilizzare?
      </h1>
      <p className="lead">
        <i className="fas fa-user" /> Puoi scegliere tra sottodominio e dominio
      </p>

      <div className="profile-grid my-1">
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Sottodominio</h2>
          <div>
            <p className="text-dark">
              Il tuo sito verrà pubblicato come un sottodominio della nostra
              piattaforma. (Scelta consigliata)
              <br />
              Ad esempio:
              <br />
              <strong>pizzeriabellanapoli.potoroo.it</strong>
            </p>
          </div>
          <input
            type="button"
            onClick={(e) => finalSubmit(e)}
            className="btn btn-primary"
            name="type"
            value="subdomain"
          />
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Dominio</h2>
          <div>
            <p className="text-dark">
              Il tuo sito verrà pubblicato sul tuo dominio personale. (Scegli
              questa opzione se già possiedi un dominio)
              <br />
              Ad esempio:
              <br />
              <strong>pizzeriabellanapoli.it</strong>
            </p>
          </div>
          <input
            type="button"
            onClick={(e) => finalSubmit(e)}
            className="btn btn-primary"
            name="type"
            value="domain"
          />
        </div>
      </div>
      <br />
      <p className="lead">
        <i className="fas fa-user" /> Verrai contattato entro 1 ora per definire
        tutti i dettagli e pubblicare il sito.
      </p>
    </Fragment>
  );
};

export default StepDomain;
