import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const grid = input.split("\n");

  let xMasFound = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] === "X") {
        for(let direction of directions){
          // console.log(`Started looking at ${i}, ${j} in direction ${direction}`);
          if(findXmas(grid, direction, i, j)){
            // console.log(`XMAS found ending at ${i},${j} in ${direction} `);
            xMasFound++
          }
        }
      }
    }
  }
  return xMasFound;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const grid = input.split("\n");

  let xMasFound = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] === "A") {
          if(findMasInX(grid, i, j)){
            xMasFound++
          }
      }
    }
  }
  return xMasFound;
};

function findMasInX(grid: string[], x: number, y: number){
  if ((x == 0) || (y == 0) || (x == grid.length-1) || (y == grid[0].length-1)){
    return false; // Along an edge, can't have neighbours
  }

  let leftRightMatch = false;
  let rightLeftMatch = false;

  if(
    (grid[x-1][y-1] == "M" && grid[x+1][y+1] == "S") ||
    (grid[x-1][y-1] == "S" && grid[x+1][y+1] == "M")
  ) {
    leftRightMatch = true;
  }

  if(
    (grid[x-1][y+1] == "M" && grid[x+1][y-1] == "S") ||
    (grid[x-1][y+1] == "S" && grid[x+1][y-1] == "M")
  ) {
    rightLeftMatch = true;
  }
  return leftRightMatch && rightLeftMatch;
}

function findXmas(grid: string[], direction: Direction, x: number, y: number) {
  const current = grid[x][y];
  if (current == xmas[3]) return true // Found a whole Christmas

  const expected = xmas[xmas.indexOf(current)+1]
  let { nextX, nextY } = stepInDirection(direction, x, y);
  if (nextX < 0 || nextX >= grid.length) return false // Out of bounds vertically
  if (nextY < 0 || nextY >= grid[0].length) return false // Out of bounds horizontally

  if (grid[nextX][nextY] == expected) {
    return findXmas(grid, direction, nextX, nextY);
  } else {
    return false
  }
}

function stepInDirection(direction: Direction, x: number, y: number) {
  let nextX = x, nextY = y;
  switch (direction) {
    case Direction.N:
      nextX = nextX - 1;
      break;
    case Direction.NE:
      nextX = nextX - 1;
      nextY = nextY + 1;
      break;
    case Direction.E:
      nextY = y + 1;
      break;
    case Direction.SE:
      nextX = nextX + 1;
      nextY = nextY + 1;
      break;
    case Direction.S:
      nextX = nextX + 1;
      break;
    case Direction.SW:
      nextX = nextX + 1;
      nextY = nextY - 1;
      break;
    case Direction.W:
      nextY = nextY - 1;
      break;
    case Direction.NW:
      nextX = nextX - 1;
      nextY = nextY - 1;
      break;
  }
  return { nextX, nextY };
}

enum Direction {
  N, NE, E, SE, S, SW, W, NW
}

const directions = [
  Direction.N,
  Direction.NE,
  Direction.E,
  Direction.SE,
  Direction.S,
  Direction.SW,
  Direction.W,
  Direction.NW
]
const xmas = ['X', 'M','A','S']

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
