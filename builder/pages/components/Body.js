import React, { Fragment } from "react";
import styled from "styled-components";

const Name = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Body = ({ name }) => {
  //console.log(site._doc);
  //console.log(site._doc.name);
  return (
    <Fragment>
      <Name>{name}</Name>
    </Fragment>
  );
};

export default Body;
