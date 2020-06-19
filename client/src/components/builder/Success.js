import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import image from "../../images/image.gif";

const Success = () => {
  return (
    <Fragment>
      <div className="profile-top bg-primary p-2">
        <img className="round-img my-1" src={image} alt="" />
        <h1 className="large">
          Il tuo sito è stato creato correttamente e sarà online entro 24 ore
        </h1>
        <p className="lead">
          Niccolò ti contatterà su Whatsapp entro un'ora per definire i dettagli
        </p>
        <p>Nicola verrà ad assaggiare la tua pizza al più presto</p>

        <div className="buttons">
          <Link to="/dashboard" className="btn btn-white">
            Vai alla tua area personale
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Success;
