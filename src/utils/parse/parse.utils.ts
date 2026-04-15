export function csvToJsonRegex(csvString: string) {
  const rows = csvString.split("\n");

  const headers = rows[0].split(",");

  const jsonData = [];
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].split(",");

    const obj = {};

    for (let j = 0; j < headers.length; j++) {
      const key = headers[j].trim();
      const value = values[j]?.trim?.();

      // @ts-expect-error WHATEVER

      obj[key] = value;
    }

    //@ts-expect-error not typed, for mock data only
    if (obj?.latitude && obj?.longitude) {
      jsonData.push(obj);
    }
  }
  return JSON.stringify(jsonData);
}
