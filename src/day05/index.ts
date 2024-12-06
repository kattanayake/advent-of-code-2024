import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const {rules, updates} = processInput(input)
  const validUpdates = updates.filter(update =>
    isValidUpdate(rules, update)
  )
  const answer = validUpdates
    .map(update => update[Math.floor(update.length/2)])
    .reduce((a, b) => a + b);
  return answer;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const {rules, updates} = processInput(input)
  const invalidUpdates = updates.filter(update =>
    !isValidUpdate(rules, update)
  )
  const validatedUpdates = invalidUpdates.map(update => validUpdates(rules, update))
  const answer = validatedUpdates
    .map(update => update[Math.floor(update.length/2)])
    .reduce((a, b) => a + b);
  return answer;
};

function processInput(input: String){
  const lines = input.split('\n').map(line => line.trim());
  let rules = new Map<number, Set<number>>()
  let updates: number[][] = []
  
  let processingRules = true
  lines.forEach(line => {
    if(line.length == 0){
      processingRules = false;
    } else if (processingRules) {
      const rule = line.split("|").map(rule => +rule )
      let curRules = rules.get(rule[0]) ?? new Set<number>();
      curRules.add(rule[1]);
      rules.set(rule[0], curRules);
    } else {
      updates.push(line.split(",").map(rule => +rule));
    }
  })
  return {rules, updates};
}

function isValidUpdate(rules: Map<number, Set<number>>, update: number[]){
  for(let i = 1; i < update.length; i++){
    for(let j = 0; j<i ;j++){
      if(rules.get(update[i])?.has(update[j])) {
        return false;
      }
    }
  }
  return true
}

function validUpdates(rules: Map<number, Set<number>>, update: number[]){
  let outerIndex = 1;
  let innerIndex = 0;
  outerLoop:
    while(outerIndex < update.length){
      while(innerIndex < outerIndex){
        const current = update[outerIndex];
        const previous = update[innerIndex];
        if(rules.get(current)?.has(previous)) {
          update[innerIndex] = current;
          update[outerIndex] = previous;
          outerIndex = innerIndex
          innerIndex = 0
          continue outerLoop
        } else {
          innerIndex++
        }
      }
      outerIndex++;
    }
  return update
}
run({
  part1: {
    tests: [
      {
        input: `47|53
      97|13
      97|61
      97|47
      75|29
      61|13
      75|53
      29|13
      97|29
      53|29
      61|53
      97|53
      61|29
      47|13
      75|47
      97|75
      47|61
      75|61
      47|29
      75|13
      53|13

      75,47,61,53,29
      97,61,53,29,13
      75,29,13
      75,97,47,61,53
      61,13,29
      97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
      97|13
      97|61
      97|47
      75|29
      61|13
      75|53
      29|13
      97|29
      53|29
      61|53
      97|53
      61|29
      47|13
      75|47
      97|75
      47|61
      75|61
      47|29
      75|13
      53|13

      75,47,61,53,29
      97,61,53,29,13
      75,29,13
      75,97,47,61,53
      61,13,29
      97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
