import { person } from "../../types.ts";
import parseYaml from '../../yaml.ts';

const people = await parseYaml("src/data/people.yaml") as person[];
const headers = { "Content-Type": "application/json" };

export default async () => {
  return new Response(JSON.stringify(people), { headers });
};
