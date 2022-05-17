import { event } from "../../types.ts";
import { YamlLoader } from "yaml_loader";
const yamlLoader = new YamlLoader();
const cwd = Deno.cwd();

const events = await yamlLoader.parseFile(
  cwd + "/src/data/events.yaml",
) as event[];
const headers = { "Content-Type": "application/json" };

export default async () => {
  return new Response(JSON.stringify(events), { headers });
};
