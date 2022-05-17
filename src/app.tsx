import React from "react";
import { SWRConfig } from "swr";
import { Helmet } from "react-helmet";
import { Link, Route, Switch } from "wouter";
import ultraCache from "ultra/cache";
import { Cache } from "https://deno.land/x/ultra/src/types.ts";
import Battle from "./battle.tsx";
import Person from "./person.tsx";
import NvS from "./northvsouth.tsx";
import Timeline from "./timeline.tsx";
import Event from "./event.tsx";

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
});

const Ultra = ({ cache }: { cache: Cache }) => {
  return (
    <SWRConfig value={options(cache)}>
      <Helmet>
        <title>Civil War Game</title>
        <link rel="stylesheet" type="text/css" href="/api/css" />
        <link rel="preload" href="/api/css" as="style" />
      </Helmet>
      <main>
        <header>
          <h1>Civil war explorer</h1>
        </header>
        <Switch>
          <Route path="/">
            <h1>Homepage</h1>

            <Link href="/timeline/0">Start!</Link>

            <h2>Look at everything seperately</h2>
            <Link href="/battles/0">
              Battles
            </Link>
            <br />
            <Link href="/people/0">
              People
            </Link>
            <br />
            <Link href="/events/0">
              Events
            </Link>
            <br />
            <Link href="/northvsouth/">
              North vs South
            </Link>
            <br />
            <br />
            <details>
              <summary>API reference</summary>
              To get data use the following endpoints:
              <ul>
                <li>
                  To get all battles:&nbsp;
                  <Link href="/api/battle/getAll">
                    /api/battle/getAll
                  </Link>
                </li>
                <li>
                  To get all people:&nbsp;
                  <Link href="/api/person/getAll">
                    /api/person/getAll
                  </Link>
                </li>
                <li>
                  To get all items im chronological order:&nbsp;
                  <Link href="/api/timeline/getAll">
                    /api/timeline/getAll
                  </Link>
                </li>
                <li>
                  To get North and South Advantages/Disadvantages:&nbsp;
                  <Link href="/api/northvsouth">
                    /api/northvsouth
                  </Link>
                </li>
                <li>
                  To get a battle by name:&nbsp;
                  <Link href="/api/battle/get">
                    /api/battle/get
                  </Link>
                </li>
                <li>
                  To get a person by name:&nbsp;
                  <Link href="/api/person/get">
                    /api/battle/get
                  </Link>
                </li>
              </ul>
            </details>
          </Route>
          <Route path="/battles/:id">
            {(props) => <Battle id={parseInt(props.id)} type="page" />}
          </Route>
          <Route path="/people/:id">
            {(props) => <Person id={parseInt(props.id)} type="page" />}
          </Route>
          <Route path="/events/:id">
            {(props) => <Event id={parseInt(props.id)} type="page" />}
          </Route>
          <Route path="/northvsouth/">
            <h1>North vs South</h1>
            <NvS type="page" />
          </Route>
          <Route path="/timeline/:id">
            {(props) => <Timeline id={parseInt(props.id)} type="page" />}
          </Route>
          <Route>
            <strong>
              404 - idk why or how you got here but here is way back
            </strong>
            <Link href="/">
              back
            </Link>
          </Route>
        </Switch>
        <footer>
          All information and images were provided by wikipedia and its
          contributors
        </footer>
      </main>
    </SWRConfig>
  );
};

export default Ultra;
