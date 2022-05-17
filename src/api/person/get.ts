import { person } from "../../types.ts";
import parseYaml from '../../yaml.ts';

const people = parseYaml("../../data/people.yaml") as person[];
const headers = { "Content-Type": "application/json" };

export default async (name: string) => {
  const person = people.find((p) => p.name === name);
  return new Response(JSON.stringify(person), { headers });
};
