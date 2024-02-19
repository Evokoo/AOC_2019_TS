// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ pathA, pathB } = parseInput(data),
		distance = locateIntersections(pathA, pathB);

	return distance;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ pathA, pathB } = parseInput(data),
		steps = locateIntersections(pathA, pathB, true);

	return steps;
}

//Run
solveB("input", "03");

type Instruction = { direction: string; amount: number };
type Point = { x: number; y: number };
type Path = Point & { steps: number };

// Functions
function parseInput(data: string) {
	const [pathA, pathB] = data.split("\r\n").map((path) => {
		return path.split(",").map((move) => {
			return { direction: move.slice(0, 1), amount: +move.slice(1) };
		});
	});

	return { pathA, pathB };
}
function tracePath(wire: Path, instructions: Instruction[]) {
	const path: Map<string, number> = new Map();

	path.set("0,0", 0);

	for (let { direction, amount } of instructions) {
		for (let i = 0; i < amount; i++) {
			switch (direction) {
				case "U":
					wire.y++;
					break;
				case "D":
					wire.y--;
					break;
				case "R":
					wire.x++;
					break;
				case "L":
					wire.x--;
					break;
			}

			wire.steps++;

			if (path.has(`${wire.x},${wire.y}`)) {
				continue;
			} else {
				path.set(`${wire.x},${wire.y}`, wire.steps);
			}
		}
	}

	return path;
}
function locateIntersections(
	wireA: Instruction[],
	wireB: Instruction[],
	partB: boolean = false
) {
	const pathA = tracePath({ steps: 0, x: 0, y: 0 }, wireA);
	const pathB = tracePath({ steps: 0, x: 0, y: 0 }, wireB);

	let steps: number = Infinity;
	let distance: number = Infinity;

	for (let [key, stepsA] of pathA) {
		if (pathB.has(key) && key !== "0,0") {
			const [x, y] = key.split(",").map(Number);
			const fromOrigin = TOOLS.manhattanDistance({ x: 0, y: 0 }, { x, y });

			distance = Math.min(distance, fromOrigin);
			steps = Math.min(steps, stepsA + pathB.get(key)!);
		}
	}

	return partB ? steps : distance;
}
