import type { LinksFunction } from "@remix-run/node"; 
import { Outlet, Link } from "@remix-run/react";


import styles from "../styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Link to="facebook">Facebook</Link> 
      <br/>
      <Link to="privacy">Privacy Policy</Link>
      <br/>
      <Link to="instagram">Instagram</Link>
      <br/>
      <Link to="google">Google</Link>
      <br/>
      <Link to="privacy">Image</Link>
      <br/>
    </div>
  );
}
