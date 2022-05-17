import { battle } from "../../types.ts";
import { YamlLoader } from "yaml_loader";
const yamlLoader = new YamlLoader();
const cwd = Deno.cwd();
const battles = await yamlLoader.parseFile(
  cwd + "/src/data/battles.yaml",
) as battle[];
const headers = { "Content-Type": "application/json" };

export default async (name: string) => {
  const battle = battles.find((b) => b.name === name);
  return new Response(JSON.stringify(battle), { headers });
};
