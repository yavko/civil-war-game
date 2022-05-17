import React from "react";
import useSWR from "swr";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { titleCase } from "https://deno.land/x/case/mod.ts";

const Navigation = (props: { id: number; length: number }) => {
  return (
    <div className="navigation">
      <Link
        href={props.id !== 0 ? "/people/" + (props.id - 1).toString() : "/"}
      >
        Back
      </Link>
      &nbsp;
      {props.id !== (props.length - 1)
        ? <Link href={"/people/" + (props.id + 1).toString()}>Next</Link>
        : <Link href="/">Home</Link>}
    </div>
  );
};

export default (props: { id: number; type: "embeded" | "page" }) => {
  const { data, error } = useSWR(
    "personData",
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  return (
    <div>
      <Helmet>
        <title>{"Civil War - " + titleCase(data?.[props.id]?.name)}</title>
      </Helmet>
      <span>
				<span className={"name"} >{titleCase(data?.[props.id]?.name)}</span>
        <br />
        <img
          src={data?.[props.id]?.imageUrl}
          alt={titleCase(data?.[props.id]?.name)}
          height="400px"
        />
        <br /> 
        What they were: {data?.[props.id]?.who}
        <br />
        Role: {data?.[props.id]?.role}
        <br />
        Significance: {data?.[props.id]?.significance}
      </span>
      {props.type !== "embeded"
        ? <Navigation id={props.id} length={data.length} />
        : ""}
    </div>
  );
};

export const fetcher = async () => {
  const response = await fetch("/api/person/getAll");
  const data = await response.json();
  return data;
};
