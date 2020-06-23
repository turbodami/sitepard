import React, { Fragment } from "react";
import styled from "styled-components";

const Palette = styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.palette};
`;

const Footer = ({ name }) => {
  //console.log(site._doc);
  //console.log(site._doc.palette);
  return (
    <Fragment>
      <Palette>{name}</Palette>
    </Fragment>
  );
};

export default Footer;
