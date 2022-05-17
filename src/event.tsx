import React from "react";
import useSWR from "swr";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { titleCase } from "https://deno.land/x/case/mod.ts";

const Involved = (props: { who: string[] }) => {
  return (
    <div>
      Who was involved: <br />
      <ul>{props.who.map((p) => <li>{titleCase(p)}</li>)}</ul>
    </div>
  );
};

const Navigation = (props: { id: number; length: number }) => {
  return (
    <div className="navigation">
      <Link
        href={props.id !== 0 ? "/events/" + (props.id - 1).toString() : "/"}
      >
        Back
      </Link>
      &nbsp;
      {props.id !== (props.length - 1)
        ? <Link href={"/events/" + (props.id + 1).toString()}>Next</Link>
        : <Link href="/">Home</Link>}
    </div>
  );
};

export default (props: { id: number; type: "embeded" | "page" }) => {
  const { data, error } = useSWR(
    "eventData",
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (props.id > data.length) return <div>not found</div>;
  return (
    <div>
      <Helmet>
        <title>{"Civil War Explorer - " + titleCase(data?.[props.id]?.name)}</title>
      </Helmet>
      <span>
       <span className="name">{titleCase(data?.[props.id]?.name)}</span>
        <br />
				<img
          src={data?.[props.id]?.imageUrl}
          alt={titleCase(data?.[props.id]?.name)}
          height="400px"
        />
				<br />
				<span>{data?.[props.id]?.description}</span>
        <br />
				<Involved who={data?.[props.id]?.involved} />
      </span>
      {props.type !== "embeded"
        ? <Navigation id={props.id} length={data.length} />
        : ""}
    </div>
  );
};

export const fetcher = async () => {
  const response = await fetch("/api/event/getAllEvents");
  const data = await response.json();
  return data;
};
