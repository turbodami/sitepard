import React, { Fragment } from "react";
import styled from "styled-components";

const Name = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Body = (site) => {
  console.log(site);
  console.log(site.name);
  return (
    <Fragment>
      <Name>{site.name}</Name>
    </Fragment>
  );
};

export default Body;
