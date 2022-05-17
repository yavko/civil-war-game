import parseYaml from '../yaml.ts';

const data = await parseYaml("src/data/northvsouth.yaml");
const headers = { "Content-Type": "application/json" };

export default async () => {
  return new Response(JSON.stringify(data), { headers });
};
