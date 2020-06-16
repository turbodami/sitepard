import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Products from "../show/Products";
import Categories from "../show/Categories";
import Menu from "../show/Menu";
import { getCurrentSite, deleteAccount, publishSite } from "../../actions/site";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from "react-bulma-components";

const Dashboard = ({
  getCurrentSite,
  deleteAccount,
  publishSite,
  auth: { user },
  site: { site, loading },
}) => {
  useEffect(() => {
    getCurrentSite();
  }, [getCurrentSite]);

  const destroy = () => {
    publishSite();
  };

  return loading && site === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="center">
        <h1 className="large text-primary">Area personale</h1>
        <p className="lead">
          <i className="fas fa-user"></i>
          Utente:
          {user && user.email}
        </p>
        <DashboardActions />
        <Button color="danger" size="large">
          Wowza!
        </Button>
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-iser-minus"></i>
          Elimina il mio account
        </button>
      </div>
      <div className="profile-grid my-1">
        {site !== null ? (
          <Fragment>
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">I miei prodotti</h2>
              <div>
                <Menu category={site.categories} product={site.products} />
              </div>
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
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  publishSite: PropTypes.func.isRequired,
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
  publishSite,
})(Dashboard);
