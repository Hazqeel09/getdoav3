/**
 * The purpose of this migration script is to modify the general json structure.
 * Please use this accordingly.
 */

import doas from "../app/data/doa.json" with { type: "json" };
import fs from "fs";

// Get all doas, and write them into prettified json file `test.json` using node
// const doasArray = Object.values(doas);
// fs.writeFileSync("test.json", JSON.stringify(doasArray, null, 2));

// 1. Get all doas
// 2. Add new parameter `slug` to each doa - should be url safe, lowercase, and no spaces, get from `name_my`, and remove all special characters
// 3. Prettify json and write to `test.json` using node
const doasArray = Object.values(doas);
const doasWithSlug = doasArray.map((doa) => {
  // Modify here
  const slug = doa.name_my.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");
  return {
    ...doa,
    slug,
    description_my: "",
    description_en: "",
    context_my: "",
    context_en: "",
  };
});
fs.writeFileSync("./app/data/doa.json", JSON.stringify(doasWithSlug, null, 2));