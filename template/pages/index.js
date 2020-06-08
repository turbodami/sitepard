import Link from "next/link";
import nextExpressPage from "next-express/page";

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

export default nextExpressPage(Home);
