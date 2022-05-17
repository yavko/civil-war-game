import { YamlLoader } from "yaml_loader";
const yamlLoader = new YamlLoader();
const cwd = Deno.cwd();

const data = await yamlLoader.parseFile(cwd + "/src/data/northvsouth.yaml");
const headers = { "Content-Type": "application/json" };

export default async () => {
  return new Response(JSON.stringify(data), { headers });
};
