import * as YAML from "https://deno.land/std@0.139.0/encoding/yaml.ts";
const file = await Deno.readTextFile("./src/data/northvsouth.yaml");

const data = YAML.parse(file);
const headers = { "Content-Type": "application/json" };

export default () => {
  return new Response(JSON.stringify(data), { headers });
};
