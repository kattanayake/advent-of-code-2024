import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const regex = /mul\(\d+,\d+\)/g
  let validInstructions =  input.match(regex);

  let answer = 0
  for(let ins of validInstructions!) {
    let commaIndex = ins.indexOf(",")!
    let number0 = +ins.substring(4, commaIndex)
    let number1 = +ins.substring(commaIndex+1, ins.length-1)
    answer += (number0 * number1)
  }
  return answer;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const regex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g
  let instructions =  input.match(regex);
  let enabled = 1
  let answer = 0
  for(let ins of instructions!) {
    if (ins == "don't()"){
      enabled = 0
    } else if (ins == "do()"){
      enabled = 1
    } else {
      let commaIndex = ins.indexOf(",")!;
      let number0 = +ins.substring(4, commaIndex);
      let number1 = +ins.substring(commaIndex + 1, ins.length - 1);
      answer += (number0 * number1 * enabled);
    }
  }
  return answer;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
