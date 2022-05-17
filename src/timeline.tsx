import React from "react";
import useSWR from "swr";
import { Link } from "wouter";
import Battle from "./battle.tsx";
import Person from "./person.tsx";
import NvS from "./northvsouth.tsx";
import Event from "./event.tsx";

const Navigation = (props: { id: number; length: number }) => {
  return (
    <div>
      <Link href={props.id !== 0 ? "/timeline/" + (props.id - 1) : "/"}>
        back
      </Link>
      &nbsp;
      <Link
        href={props.id !== props.length - 1
          ? "/timeline/" + (props.id + 1)
          : "/"}
      >
        next
      </Link>
    </div>
  );
};

const Embeded = (
  props: { type: "battle" | "person" | "northvsouth" | "event"; id: number },
) => {
  switch (props.type) {
    case "battle":
      return <Battle id={props.id} type="embeded" />;
    case "person":
      return <Person id={props.id} type="embeded" />;
    case "northvsouth":
      return <NvS type="embeded" />;
    case "event":
      return <Event id={props.id} type="embeded" />;
  }
};

export default (props: { id: number; type: "page" | "embeded" }) => {
  const { data, error } = useSWR("timelineData", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <Embeded type={data?.[props.id]?.type} id={data?.[props.id]?.id} />
      {props.type !== "embeded"
        ? <Navigation id={props.id} length={data.length} />
        : ""}
    </div>
  );
};

export const fetcher = async () => {
  const res = await fetch("/api/timeline/getTimeline");
  const data = await res.json();
  return data;
};
