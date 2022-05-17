import * as YAML from "https://deno.land/std@0.139.0/encoding/yaml.ts";

export default async (path: string) =>
  YAML.parse(await Deno.readTextFile(path));
