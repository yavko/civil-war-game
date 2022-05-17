import { person } from "../../types.ts";
import { YamlLoader } from "yaml_loader";
const yamlLoader = new YamlLoader();
const cwd = Deno.cwd();

const people = await yamlLoader.parseFile(
  cwd + "/src/data/people.yaml",
) as person[];
const headers = { "Content-Type": "application/json" };

export default async () => {
  return new Response(JSON.stringify(people), { headers });
};
