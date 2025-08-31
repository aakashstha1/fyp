import csv from "csv-parser";
import fs from "fs";

export const parseCsvFile = (filePath) =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const question = row["Question"];
        const options = Object.keys(row)
          .filter((k) => k.toLowerCase().startsWith("option"))
          .map((k) => row[k])
          .filter((v) => v && v.trim() !== "");
        const answer = row["Correct Answer"] || null;
        results.push({ question, options, answer });
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
