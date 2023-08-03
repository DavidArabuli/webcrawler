const { writeFile } = require("fs");
const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");
const { log } = require("console");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many command line arguments");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`starting crawl of ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  let consoleMessages = `starting crawl of ${baseURL}\n`;
  const report = printReport(pages);
  consoleMessages += report;
  writeReportToFile(consoleMessages);
}

function writeReportToFile(report) {
  const fileName = "report.txt";
  writeFile(fileName, report, (err) => {
    if (err) {
      console.error("error writing report to the file", err);
    } else {
      console.log(`report written to the file : ${fileName}`);
    }
  });
}
main();
