import { event } from "../../types.ts";
import parseYaml from '../../yaml.ts';

const events = parseYaml("src/data/events.yaml") as event[];
const headers = { "Content-Type": "application/json" };

export default async () => {
  return new Response(JSON.stringify(events), { headers });
};
