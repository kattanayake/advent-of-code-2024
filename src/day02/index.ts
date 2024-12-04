import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let reports = processInput(input)

  let numSafeReports = 0
  for(let report of reports) {
    if(isReportSafe(report)) {
      numSafeReports++;
    }
  }
  return numSafeReports;
};

function isReportSafe(report: number[]) {
  let decreasing = report[0] > report[1]
  for (let j = 1; j < report.length; j++) {
    // Breaks the sequence
    if (decreasing === (report[j-1] < report[j])) {
      return false;
    }
    // Can't be the same
    if (report[j-1] === report[j]){
      return false;
    }
    let delta = report[j-1] - report[j]
    // Gap is too big
    if ((delta > 3) || (delta < -3)){
      return false;
    }
  }
  return true
}

function isReportSafeWithTolerance(report: number[]){
  if(isReportSafe(report)) return true;
  for (let j = 0; j < report.length; j++) {
    let removedVal = report[j]
    report.splice(j, 1);
    if(isReportSafe(report)) return true;
    report.splice(j, 0, removedVal);
  }
  return false;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let reports = processInput(input)

  let numSafeReports = 0
  for(let report of reports) {
    if(isReportSafeWithTolerance(report)) {
      numSafeReports++;
    }
  }
  return numSafeReports;
};

function processInput(input: String) {
  let reports: number[][] = []
  input.split("\n").forEach(line => {
    let values = line.split(" ").filter(value => value !== " " && value != "");
    reports.push(values.map(value => +value))
  })
  return reports;
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
