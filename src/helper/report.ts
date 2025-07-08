const report = require("multiple-cucumber-html-reporter");
const dateFormatOptions = {
  year: 'numeric' as const,
  month: 'short' as const,
  day: 'numeric' as const,
  hour: '2-digit' as const,
  minute: '2-digit' as const,
  hour12: true,
  timeZoneName: 'short' as const
};
report.generate({
  jsonDir: "test-results",
  reportPath: "multipleReport",
  reportName:"Playwright BDD Report",
  pageTitle:"Book Cart Application Test Report",
  metadata: {
    browser: {
      name: "chrome",
      version: "60",
    },
    device: "Soundar - Machine",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Test info",
    data: [
      { label: "Project", value: "Book Cart Project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "smoke-1" },
      { label: "Execution Start Time", value: new Date().toLocaleString('en-US', dateFormatOptions) },
      { label: "Execution End Time", value: new Date().toLocaleString('en-US', dateFormatOptions) }
    ],
  },
});
