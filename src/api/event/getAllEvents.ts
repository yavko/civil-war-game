import { event } from "../../types.ts";
import * as YAML from "https://deno.land/std@0.139.0/encoding/yaml.ts";
const file = await Deno.readTextFile("./src/data/events.yaml");

const events = YAML.parse(file) as event[];
const headers = { "Content-Type": "application/json" };

export default () => {
  return new Response(JSON.stringify(events), { headers });
};
