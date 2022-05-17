import { battle, event, person, timeline } from "../../types.ts";
import * as YAML from "https://deno.land/std@0.139.0/encoding/yaml.ts";

const timelines = YAML.parse(
  await Deno.readTextFile("./src/data/timeline.yaml"),
) as timeline[];
const battles = YAML.parse(
  await Deno.readTextFile("./src/data/battles.yaml"),
) as battle[];
const people = YAML.parse(
  await Deno.readTextFile("./src/data/people.yaml"),
) as person[];
const events = YAML.parse(
  await Deno.readTextFile("./src/data/events.yaml"),
) as event[];

const headers = { "Content-Type": "application/json" };

timelines.forEach((timeline) => {
  const { name, type } = timeline;
  switch (type) {
    case "person":
      timeline.data = people.find((person) => person.name === name);
      break;
    case "event":
      timeline.data = events.find((event) => event.name === name);
      break;
    case "battle":
      timeline.data = battles.find((battle) => battle.name === name);
      break;
  }
});

export default () => {
  return new Response(JSON.stringify(timelines), { headers });
};
