import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json }from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Blurred Boundaries: Your Public Information Guide",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async () => {
  return json({
    ENV: {
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
      INSTAGRAM_SECRET: process.env.INSTAGRAM_SECRET,
    },
  });
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
