import styled from "styled-components";

const Title = styled.h1`
  font-size: 50px;
`;

export default function Home(props) {
  return (
    <p>{props.diocan.category}</p>
    <Title>My page</Title>;

  )
}

Home.getInitialProps({query: {diocan}}){
  return {
    diocan: diocan
  }
}
