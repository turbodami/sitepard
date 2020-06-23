import React, { Fragment } from "react";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const Home = ({ site }) => {
  const { category, name } = site;

  const props = { category, name };

  return (
    <Fragment>
      <h1>{...props}</h1>
      <Header {...props} />
      <Body {...props} />
      <Footer {...props} />
    </Fragment>
  );
};

Home.getInitialProps = ({ query: { site } }) => {
  return {
    site: site,
  };
};

export default Home;
