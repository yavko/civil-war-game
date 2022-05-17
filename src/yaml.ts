import * as YAML from "https://deno.land/std@0.139.0/encoding/yaml.ts";

export default (path: string) => YAML.parse(Deno.readTextFileSync(path));
