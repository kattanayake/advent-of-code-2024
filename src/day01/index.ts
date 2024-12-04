import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let { listOne, listTwo } = processInput(input);

  let listOneSorted = listOne.sort()
  let listTwoSorted = listTwo.sort()

  let differenceSum = 0
  listOneSorted.forEach((item, i) => {
    let difference = item - listTwoSorted[i]
    if (difference < 0){
      difference *= -1
    }
    differenceSum += difference
  })

  return differenceSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let { listOne, listTwo } = processInput(input);

  let answerMap = new Map<number, number>()
  listOne.forEach((item, i) => {
    answerMap.set(item, 0)
  })
  listTwo.forEach((item, i) => {
    const curVal = answerMap.get(item) ?? 0
    answerMap.set(item, curVal + 1)
  })

  let answer = 0
  listOne.forEach((item, i) => {
    answer += (item * (answerMap.get(item) ?? 0))
  })
  return answer;
};

function processInput(input: String) {
  let listOne: number[] = []
  let listTwo: number[] = []
  input.split("\n").forEach(line => {
    let _, b = line.split(" ").filter(value => value !== " " && value != "");
    listOne.push(+b[0]!)
    listTwo.push(+b[1]!)
  })
  return { listOne, listTwo };
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
