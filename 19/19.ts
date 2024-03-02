// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	runIntcode(data, 50);
	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "19");

// Functions
function runIntcode(data: string, size: number) {
	const beam: Set<string> = new Set();

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const comp = new Intcode(data, [x, y]);
			comp.run();

			if (comp.lastOutput === 1) {
				beam.add(`${x},${y}`);
			}
		}
	}

	console.log(beam.size);
}
