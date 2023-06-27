import { getBreaches, getS3Logos } from "./lib.js";

const breaches = await getBreaches();
const logos = await getS3Logos();

const breachDomains = breaches.reduce((acc, b) => {
  if (b.Domain !== "") {
    acc.add(b.Domain);
  }
  return acc;
}, new Set());

// breachDomains.add("missingbreachdomain.org");

for (const d of breachDomains) {
  if (!(d.toLowerCase() in logos)) {
    console.error(`Logo not found: "${d}"`);
    process.exitCode = 1;
  }
}
