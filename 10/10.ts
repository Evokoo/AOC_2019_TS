// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		astroidMap = parseInput(data),
		stationLocation = locateStation(astroidMap);

	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "10");

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
	for (let y = 0; y < astroidMap.dimensions.maxY; y++) {
		for (let x = 0; x < astroidMap.dimensions.maxX; x++) {
			if (astroidMap.grid[y][x] === "#") {
				lineOfSight({ x, y }, astroidMap);
				// console.log(visibleAstroids);
			}
		}
	}
}

function lineOfSight(astroid: Point, astroidMap: AstroidMap) {
	const seen: Set<string> = new Set();

	for (let angle = 0; angle < 360; angle++) {
		const radianAngle = (angle * Math.PI) / 180;
		let x = astroid.x + Math.cos(radianAngle);
		let y = astroid.y + Math.sin(radianAngle);

		while (
			x >= 0 &&
			y >= 0 &&
			x < astroidMap.dimensions.maxX - 1 &&
			y < astroidMap.dimensions.maxY - 1
		) {
			const roundedX = Math.round(x);
			const roundedY = Math.round(y);

			if (
				Number.isInteger(x) &&
				Number.isInteger(y) &&
				astroidMap.grid[y][x] === "#"
			) {
				seen.add(`${roundedX},${roundedY}`);
			} else {
				x += Math.cos(radianAngle);
				y += Math.sin(radianAngle);
			}
		}
	}

	console.log(astroid, seen);

	// console.log({ astroid, visible, count: visible.length });
}
