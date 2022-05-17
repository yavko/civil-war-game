import { person } from "../../types.ts";
import * as YAML from "https://deno.land/std@0.139.0/encoding/yaml.ts";
const file = await Deno.readTextFile("./src/data/people.yaml");

const people = YAML.parse(file) as person[];
const headers = { "Content-Type": "application/json" };

export default (name: string) => {
  const person = people.find((p) => p.name === name);
  return new Response(JSON.stringify(person), { headers });
};
