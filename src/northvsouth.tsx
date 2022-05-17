import React, { useState } from "react";
import useSWR from "swr";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

const Navigation = () => {
  return (
    <div className="navigation">
      <Link href="/">
        Back
      </Link>
    </div>
  );
};

export default (props: { type: "embeded" | "page" }) => {
  const { data, error } = useSWR("northvsouthData", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Civil War Explorer - North vs. South</title>
      </Helmet>
      <span>
        <p>North Advantages</p>
        <ul>
          {data.north.advantages.map((item: string) => {
            return <li>{item}</li>;
          })}
        </ul>
      </span>
      <span>
        <p>South Advantages</p>
        <ul>
          {data.south.advantages.map((item: string) => {
            return <li>{item}</li>;
          })}
        </ul>
      </span>
      <span>
        <p>North Disadvantages</p>
        <ul>
          {data.north.disadvantages.map((item: string) => {
            return <li>{item}</li>;
          })}
        </ul>
      </span>
      <span>
        <p>South Disadvantages</p>
        <ul>
          {data.south.disadvantages.map((item: string) => {
            return <li>{item}</li>;
          })}
        </ul>
      </span>
      {props.type !== "embeded" ? <Navigation /> : ""}
    </div>
  );
};

export const fetcher = async () => {
  const res = await fetch("/api/northvsouth");
  const data = await res.json();
  return data;
};
