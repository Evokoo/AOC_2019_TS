// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ grid, portals } = parseInput(data),
		steps = findPath(grid, portals);

	return steps;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveB("example_b", "20");

// Functions
type Point = { x: number; y: number };
type Grid = string[][];
type Portals = Map<string, string>;
type Path = {
	x: number;
	y: number;
	steps: number;
	teleported: boolean;
};

function toPoint(string: string): Point {
	const correctFormat = /\d+,\d+/.test(string);

	if (correctFormat) {
		const [x, y] = string.split(",");
		return { x: +x, y: +y };
	} else {
		throw Error("Invalid format");
	}
}
function parseInput(data: string) {
	const locations: Map<string, Point[]> = new Map();
	const skip: Set<string> = new Set();

	const grid = data.split("\r\n").map((row) => [...row]);
	const width = grid[0].length;
	const height = grid.length;

	for (let y = 0; y < height - 1; y++) {
		for (let x = 0; x < width; x++) {
			if (skip.has(`${x},${y}`)) {
				continue;
			}

			const current = grid[y][x];

			if (/[A-Z]+/.test(current)) {
				const right = grid[y][x + 1];
				const below = grid[y + 1][x];

				if (/[A-Z]+/.test(right)) {
					const key = current + right;

					if (x + 2 >= width || grid[y][x + 2] !== ".") {
						switch (key) {
							case "AA":
								locations.set("start", [{ x: x - 1, y }]);
								break;
							case "ZZ":
								locations.set("end", [{ x: x - 1, y }]);
								break;
							default:
								locations.set(key, [
									...(locations.get(key) ?? []),
									{ x: x - 1, y },
								]);
						}
					} else {
						switch (key) {
							case "AA":
								locations.set("start", [{ x: x + 2, y }]);
								break;
							case "ZZ":
								locations.set("end", [{ x: x + 2, y }]);
								break;
							default:
								locations.set(key, [
									...(locations.get(key) ?? []),
									{ x: x + 2, y },
								]);
						}
					}

					skip.add(`${x + 1},${y}`);
				}

				if (/[A-Z]+/.test(below)) {
					const key = current + below;

					if (y + 2 >= height || grid[y + 2][x] !== ".") {
						switch (key) {
							case "AA":
								locations.set("start", [{ x, y: y - 1 }]);
								break;
							case "ZZ":
								locations.set("end", [{ x, y: y - 1 }]);
								break;
							default:
								locations.set(key, [
									...(locations.get(key) ?? []),
									{ x, y: y - 1 },
								]);
						}
					} else {
						switch (key) {
							case "AA":
								locations.set("start", [{ x, y: y + 2 }]);
								break;
							case "ZZ":
								locations.set("end", [{ x, y: y + 2 }]);
								break;
							default:
								locations.set(key, [
									...(locations.get(key) ?? []),
									{ x, y: y + 2 },
								]);
						}
					}

					skip.add(`${x},${y + 1}`);
				}
			}
		}
	}

	const portals: Portals = new Map();

	for (let [key, values] of locations) {
		if (key === "start" || key === "end") {
			portals.set(key, `${values[0].x},${values[0].y}`);
		} else {
			portals.set(
				`${values[0].x},${values[0].y}`,
				`${values[1].x},${values[1].y}`
			);
			portals.set(
				`${values[1].x},${values[1].y}`,
				`${values[0].x},${values[0].y}`
			);
		}
	}

	return { grid, portals };
}
function findPath(grid: Grid, portals: Portals) {
	const start = toPoint(portals.get("start")!);
	const queue: Path[] = [
		{ x: start.x, y: start.y, steps: 0, teleported: false },
	];
	const seen: Set<string> = new Set();

	while (queue.length) {
		const current = queue.shift()!;
		const coord = `${current.x},${current.y}`;

		if (seen.has(coord)) {
			continue;
		} else {
			seen.add(coord);
		}

		if (coord === portals.get("end")) {
			return current.steps;
		}

		if (!current.teleported && portals.has(coord)) {
			const { x, y } = toPoint(portals.get(coord)!);

			queue.push({
				x,
				y,
				steps: current.steps + 1,
				teleported: true,
			});
		}

		for (let [nx, ny] of [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		]) {
			const [x, y] = [current.x + nx, current.y + ny];

			if (grid[y][x] === ".") {
				queue.push({
					x,
					y,
					steps: current.steps + 1,
					teleported: false,
				});
			}
		}

		queue.sort((a, b) => a.steps - b.steps);
	}

	throw Error("Path not found!");
}
