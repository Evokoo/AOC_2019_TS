// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		astroidMap = parseInput(data),
		{ visible } = locateStation(astroidMap);

	return visible;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		astroidMap = parseInput(data),
		{ astroidList } = locateStation(astroidMap),
		{ position } = astroidList.sort((a, b) => a.bearing - b.bearing)[199];

	return position.x * 100 + position.y;
}

//Run
solveB("input", "10");

// Functions
type Point = { x: number; y: number };
type Grid = string[][];
type Dimensions = { maxX: number; maxY: number };
type AstroidMap = { grid: Grid; dimensions: Dimensions };
type Astroid = { position: Point; bearing: number };

function parseInput(data: string) {
	const grid = data.split("\r\n").map((row) => [...row]);
	const maxY = grid.length;
	const maxX = grid[0].length;

	return { grid, dimensions: { maxY, maxX } };
}
function locateStation(astroidMap: AstroidMap) {
	let visible = 0;
	let location = { x: 0, y: 0 };
	let astroidList: Astroid[] = [];

	for (let y = 0; y < astroidMap.dimensions.maxY; y++) {
		for (let x = 0; x < astroidMap.dimensions.maxX; x++) {
			if (astroidMap.grid[y][x] === "#") {
				const { count, list } = lineOfSight({ x, y }, astroidMap);

				if (count > visible) {
					visible = count;
					location = { x, y };
					astroidList = list;
				}
			}
		}
	}

	return { location, visible, astroidList };
}
function lineOfSight(astroid: Point, astroidMap: AstroidMap) {
	const visble: Set<number> = new Set();
	const astroids: Astroid[] = [];

	for (let y = 0; y < astroidMap.dimensions.maxY; y++) {
		for (let x = 0; x < astroidMap.dimensions.maxX; x++) {
			if (
				astroidMap.grid[y][x] === "#" &&
				!(astroid.y === y && astroid.x === x)
			) {
				const angle = Math.atan2(y - astroid.y, x - astroid.x);
				let degrees = (angle * (180 / Math.PI) + 360) % 360;
				degrees = (degrees + 90) % 360;

				if (visble.has(degrees)) {
					continue;
				} else {
					visble.add(degrees);
					astroids.push({ position: { x, y }, bearing: degrees });
				}
			}
		}
	}

	return { count: visble.size, list: astroids };
}
