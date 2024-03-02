// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "18");

// Functions
type Point = { x: number; y: number };
type Locations = {
	start: Point;
	items: {
		[ID: string]: { key: Point; door: Point };
	};
};

function parseInput(data: string) {
	const grid = data.split("\r\n");
	const locations: Locations = { start: { x: 0, y: 0 }, items: {} };
	const height = grid.length;
	const width = grid[0].length;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const tile = grid[y][x];

			if (tile === "@") {
				locations.start = { x, y };
			}

			if (/[a-z]/i.test(tile)) {
				let objKey = tile.toUpperCase();

				if (/[A-Z]/.test(tile)) {
					locations.items[objKey] = {
						...locations.items[objKey],
						door: { x, y },
					};
				} else {
					locations.items[objKey] = {
						...locations.items[objKey],
						key: { x, y },
					};
				}
			}
		}
	}

	console.log(locations);
}
