import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Products from "./Products";
import { getCurrentSite, deleteAccount } from "../../actions/site";

const Dashboard = ({
  getCurrentSite,
  deleteAccount,
  auth: { user },
  site: { site, loading },
}) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  return loading && site === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Area personale</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Utente:
        {user && user.email}
      </p>
      {site !== null ? (
        <Fragment>
          <DashboardActions />
          <Products product={site.products} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-iser-minus"></i>
              Elimina il mio account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Completa il tuo sito qui di seguito, poi pubblicalo!</p>
          <Link to="/create-site" className="btn btn-primary my-1">
            Crea sito
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
});

export default connect(mapStateToProps, {
  getCurrentSite,
  deleteAccount,
})(Dashboard);
