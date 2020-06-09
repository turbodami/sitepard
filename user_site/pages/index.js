import Link from "next/link";

const Home = (props) => (
  <ul>
    <li>
      <Link href="/b" as="/a">
        <a>a</a>
      </Link>
    </li>
    <li>
      <Link href="/a" as="/b">
        <a>b</a>
      </Link>
    </li>
  </ul>
);

Home.getInitialProps = async ({query: {diocan}}) => {
  console.log(diocan);
  return{
    diocan: diocan
  }
}

export default Home;
