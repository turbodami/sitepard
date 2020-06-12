import React, { Fragment } from "react";
import styled from "styled-components";

const Palette = styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.palette};
`;

const Footer = (site) => {
  return (
    <Fragment>
      <Palette>{site.palette}</Palette>
    </Fragment>
  );
};

export default Footer;
