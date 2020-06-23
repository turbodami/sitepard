import React, { Fragment } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Header = ({ category, name }) => {
  //console.log(site._doc);
  //console.log(site._doc.category);
  return (
    <Fragment>
      <Title>{name}</Title>
    </Fragment>
  );
};

export default Header;
