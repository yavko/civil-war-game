import { battle } from "../../types.ts";
import * as YAML from "https://deno.land/std@0.139.0/encoding/yaml.ts";
const file = await Deno.readTextFile("./src/data/battles.yaml");

const battles = YAML.parse(file) as battle[];
const headers = { "Content-Type": "application/json" };

export default () => {
  return new Response(JSON.stringify(battles), { headers });
};
