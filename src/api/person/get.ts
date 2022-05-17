import { person } from "../../types.ts";
import { YamlLoader } from "yaml_loader";
const yamlLoader = new YamlLoader();

const people = await yamlLoader.parseFile("../../data/people.yaml") as person[];
const headers = { "Content-Type": "application/json" };

export default async (name: string) => {
  const person = people.find((p) => p.name === name);
  return new Response(JSON.stringify(person), { headers });
};
