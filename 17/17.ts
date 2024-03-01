// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		comp = new Intcode(data),
		score = scoreGrid(getGrid(comp));

	return score;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "17");

// Functions
function getGrid(comp: Intcode) {
	comp.run();
	const grid: String[][] = [];

	let row = [];

	for (let n of comp.outputs) {
		switch (n) {
			case 35:
				row.push("#");
				break;
			case 46:
				row.push(".");
				break;
			case 10:
				grid.push(row);
				row = [];
				break;
			default:
				row.push(String.fromCharCode(n));
		}
	}

	return grid;
}
function scoreGrid(grid: String[][]) {
	const height = grid.length;
	const width = grid[0].length;

	let score = 0;

	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {
			const intersection = [
				[0, 0],
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0],
			].every(([nx, ny]) => {
				return grid[y + ny][x + nx] === "#";
			});

			if (intersection) {
				console.log({ y, x });
				score += x * y;
			}
		}
	}

	return score;
}
