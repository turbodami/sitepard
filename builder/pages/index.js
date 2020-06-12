import styled from "styled-components";
import React, {Fragment} from "react";

const Title = styled.h1`
  font-size: 50px;
`;

export default function Home(props) {
  return (
    <Fragment>
      <p>{props.diocan.category}</p>
      <Title>My page</Title>;
    </Fragment>
  )
}

Home.getInitialProps({query: {diocan}}){
  return {
    diocan: diocan
  }
}
