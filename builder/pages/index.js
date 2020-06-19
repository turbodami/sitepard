import React, { Fragment } from "react";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const Home = (props) => {
  const { site } = props;

  return (
    <Fragment>
      <h1>{props.site.category}</h1>
      <Header {...site} />
      <Body {...site} />
      <Footer {...site} />
    </Fragment>
  );
};

Home.getInitialProps = ({ query: { site } }) => {
  return {
    site: site,
  };
};

export default Home;