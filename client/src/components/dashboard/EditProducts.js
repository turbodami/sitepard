import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Menu from "../show/Menu";
import { getCurrentSite } from "../../actions/site";
import { Columns, Content } from "react-bulma-components";

const EditProducts = ({
  getCurrentSite,
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
      {site !== null ? (
        <Fragment>
          <Columns>
            <Columns.Column size={8}>
              <Menu category={site.categories} product={site.products} />
            </Columns.Column>
            <Columns.Column size={4}>
              <Content>
                <div className="marvel-device iphone-x">
                  <div className="notch">
                    <div className="camera"></div>
                    <div className="speaker"></div>
                  </div>
                  <div className="top-bar"></div>
                  <div className="sleep"></div>
                  <div className="bottom-bar"></div>
                  <div className="volume"></div>
                  <div className="overflow">
                    <div className="shadow shadow--tr"></div>
                    <div className="shadow shadow--tl"></div>
                    <div className="shadow shadow--br"></div>
                    <div className="shadow shadow--bl"></div>
                  </div>
                  <div className="inner-shadow"></div>
                  <div className="screen">
                    <h1>mmm</h1>
                  </div>
                </div>
              </Content>
            </Columns.Column>
          </Columns>
        </Fragment>
      ) : (
        <Fragment>
          <p>C'è qualche problema!</p>
        </Fragment>
      )}
    </Fragment>
  );
};

EditProducts.propTypes = {
  getCurrentSite: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
});

export default connect(mapStateToProps, {
  getCurrentSite,
})(EditProducts);
