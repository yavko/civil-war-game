import { battle } from "../../types.ts";
import parseYaml from '../../yaml.ts';

const battles = parseYaml("src/data/battles.yaml") as battle[];
const headers = { "Content-Type": "application/json" };

export default async (name: string) => {
  const battle = battles.find((b) => b.name === name);
  return new Response(JSON.stringify(battle), { headers });
};
