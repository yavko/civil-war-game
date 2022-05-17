import { battle } from "../../types.ts";
import { YamlLoader } from "yaml_loader";
const yamlLoader = new YamlLoader();
const cwd = Deno.cwd();

const battles = await yamlLoader.parseFile(
  cwd + "/src/data/battles.yaml",
) as battle[];
const headers = { "Content-Type": "application/json" };

export default async () => {
  return new Response(JSON.stringify(battles), { headers });
};
