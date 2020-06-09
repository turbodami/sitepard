import Link from "next/link";

const Index = ({ diocan }) => (
  <ul>
    <li>
      <Link href="/b" as="/a">
        <a>a</a>
      </Link>
    </li>
    {diocan}
    <li>
      <Link href="/a" as="/b">
        <a>b</a>
      </Link>
    </li>
  </ul>
);

Index.getInitialProps = async ({ query: { diocan } }) => {
  //console.log(diocan);
  return {
    diocan: diocan,
  };
};

export default Index;
