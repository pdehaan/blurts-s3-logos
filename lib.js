export async function getBreaches() {
  const res = await fetch("https://haveibeenpwned.com/api/v3/breaches");
  return res.json();
};

export async function getS3Logos() {
  const { XMLParser } = await import("fast-xml-parser");
  const res = await fetch("https://s3.amazonaws.com/firefoxmonitor-dev-monitor-cdn-dev-static-website/");
  const txt = await res.text();
  const parser = new XMLParser();
  const { ListBucketResult } = parser.parse(txt);
  return ListBucketResult.Contents.reduce((acc, logo) => {
    const Key = logo.Key.toLowerCase();
    const Domain = Key.replace(/\.ico$/, "");
    acc[Domain] = {
      Logo: Key,
      Domain,
      LastModified: new Date(logo.LastModified),
      Size: logo.Size,
    };
    return acc;
  }, {});
};
