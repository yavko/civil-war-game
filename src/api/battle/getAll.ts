import { battle } from "../../types.ts";
import parseYaml from '../../yaml.ts';

const battles = parseYaml("src/data/battles.yaml") as battle[];
const headers = { "Content-Type": "application/json" };

export default async () => {
  return new Response(JSON.stringify(battles), { headers });
};
