// pages/index.js

function Home() {
  return (
    <div className="container">
      <h1>Hello Next.js</h1>
      <p>Let's explore different ways to style Next.js apps</p>
      <style jsx>{`
        .container {
          margin: 50px;
        }
        p {
          color: blue;
        }
      `}</style>
    </div>
  );
}

export default Home;

/* Index.getInitialProps = async ({ query: { diocan } }) => {
  //console.log(diocan);
  return {
    diocan: diocan,
  };
}; */
