// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = runSimulation(parseInput(data)),
		rating = getBioRating(grid);

	return rating;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "24");

// Functions
type Tile = { x: number; y: number; tile: string };
type Point = { x: number; y: number };

function parseInput(data: string) {
	return data.split("\r\n").map((row) => [...row]);
}
function runSimulation(grid: string[][]) {
	const layouts: Set<string> = new Set([getLayout(grid)]);

	let updates: Tile[] = [];

	while (true) {
		for (let y = 0; y < 5; y++) {
			for (let x = 0; x < 5; x++) {
				const currentTile = grid[y][x];
				const newTile = getNewTile({ x, y }, grid);

				if (currentTile === newTile) {
					continue;
				} else {
					updates.push({ x, y, tile: newTile });
				}
			}
		}

		for (let { x, y, tile } of updates) {
			grid[y][x] = tile;
		}

		const currentLayout = getLayout(grid);

		if (layouts.has(currentLayout)) {
			// printGrid(grid);
			return grid;
		} else {
			layouts.add(currentLayout);
			updates = [];
		}
	}
}
function getLayout(grid: string[][]) {
	const layout = [];

	for (let y = 0; y < 5; y++) {
		for (let x = 0; x < 5; x++) {
			const tile = grid[y][x];
			layout.push(`${x},${y},${tile}`);
		}
	}

	return layout.join("|");
}
function getNewTile(point: Point, grid: string[][]) {
	const count = { bug: 0, empty: 0 };
	const currentStatus = grid[point.y][point.x];

	for (let [nx, ny] of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	]) {
		const [x, y] = [point.x + nx, point.y + ny];

		if (x < 0 || x >= 5 || y < 0 || y >= 5) {
			count.empty++;
			continue;
		}

		const tile = grid[y][x];

		if (tile === ".") count.empty++;
		if (tile === "#") count.bug++;
	}

	if (currentStatus === "#") {
		return count.bug === 1 ? "#" : ".";
	}

	if (currentStatus === "." && (count.bug === 1 || count.bug === 2)) {
		return "#";
	}

	return currentStatus;
}
function getBioRating(grid: string[][]) {
	let rating = 0;
	let value = 1;

	for (let tile of grid.flat()) {
		if (tile === "#") {
			rating += value;
		}

		value *= 2;
	}

	return rating;
}

//Debug
function printGrid(grid: string[][]): void {
	const img = grid.map((row) => row.join("")).join("\n");
	console.log(img);
}
