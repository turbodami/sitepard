import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = ({ publishSite }) => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-site" className="btn btn-white">
        <i className="fas fa-user-circle text-primary"></i>
        Modifica sito
      </Link>
      <Link to="/add-product" className="btn btn-white">
        <i className="fab fa-black-tie text-primary"></i>
        Aggiungi prodotto
      </Link>
    </div>
  );
};

export default DashboardActions;
