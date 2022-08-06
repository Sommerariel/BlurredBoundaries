import type { LinksFunction } from "@remix-run/node"; 

import styles from "../styles/Index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      hello world
    </div>
  );
}
