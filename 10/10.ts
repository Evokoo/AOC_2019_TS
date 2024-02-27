// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		astroidMap = parseInput(data),
		{ location, visible } = locateStation(astroidMap);

	return visible;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		astroidMap = parseInput(data),
		{ location, visible } = locateStation(astroidMap);

	return visible;
}

//Run
solveB("example_b", "10");

// Functions
type Point = { x: number; y: number };
type Grid = string[][];
type Dimensions = { maxX: number; maxY: number };
type AstroidMap = { grid: Grid; dimensions: Dimensions };

function parseInput(data: string) {
	const grid = data.split("\r\n").map((row) => [...row]);
	const maxY = grid.length;
	const maxX = grid[0].length;

	return { grid, dimensions: { maxY, maxX } };
}
function locateStation(astroidMap: AstroidMap) {
	let visible = 0;
	let location = { x: 0, y: 0 };

	for (let y = 0; y < astroidMap.dimensions.maxY; y++) {
		for (let x = 0; x < astroidMap.dimensions.maxX; x++) {
			if (astroidMap.grid[y][x] === "#") {
				const count = lineOfSight({ x, y }, astroidMap);

				if (count > visible) {
					visible = count;
					location = { x, y };
				}
			}
		}
	}

	return { location, visible };
}
function lineOfSight(astroid: Point, astroidMap: AstroidMap) {
	const visble: Set<number> = new Set();

	for (let y = 0; y < astroidMap.dimensions.maxY; y++) {
		for (let x = 0; x < astroidMap.dimensions.maxX; x++) {
			if (
				astroidMap.grid[y][x] === "#" &&
				!(astroid.y === y && astroid.x === x)
			) {
				const angle = Math.atan2(y - astroid.y, x - astroid.x);
				visble.add(angle);
			}
		}
	}

	return visble.size;

	// console.log({ astroid, visible, count: visible.length });
}
function destroyAstroids(astroid: P);
