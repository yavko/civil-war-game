import { battle } from "../../types.ts";
import * as YAML from "https://deno.land/std@0.139.0/encoding/yaml.ts";
const file = await Deno.readTextFile("./src/data/battles.yaml");

const battles = YAML.parse(file) as battle[];
const headers = { "Content-Type": "application/json" };

export default (name: string) => {
  const battle = battles.find((b) => b.name === name);
  return new Response(JSON.stringify(battle), { headers });
};
