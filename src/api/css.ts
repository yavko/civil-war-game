import sass from "https://deno.land/x/denosass/mod.ts";
import { md5 } from "https://esm.sh/hash-wasm";

const headers = { "Content-Type": "text/css" };

const getCSS = async () => {
  const css = `${
    sass("src/styles/style.scss", {
      load_paths: ["src/styles/"],
      quiet: false,
      style: "compressed",
    }).to_string()
  }`;
  const hash = await md5(Deno.readTextFileSync("src/styles/style.scss"));
  if (css) {
    localStorage.setItem("compiledCSS", css);
    localStorage.setItem("CSSStamp", new Date().toString());
    localStorage.setItem("OGHash", hash);
  }
  return css;
};

const integrity = async () => {
  const curHash = localStorage.getItem("OGHash");
  const file = Deno.readTextFileSync("src/styles/style.scss");
  const hash = await md5(file);
  if (hash !== curHash) {
    getCSS();
  }
};

export default async () => {
  let css = localStorage.getItem("compiledCSS");
  const stamp = localStorage.getItem("CSSStamp");

  if (!css) css = await getCSS();

  await integrity();

  if (stamp && new Date().getMilliseconds() > parseInt(stamp) + 1800000) {
    getCSS();
  }

  return new Response(css, { headers });
};
