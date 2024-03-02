// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return getBeamSize(data, 50);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return locateShip(data, 100);
}

//Run
solveB("input", "19");

// Functions
function inBeam(data: string, x: number, y: number) {
	const comp = new Intcode(data, [x, y]);
	comp.run();
	return comp.lastOutput === 1;
}
function getBeamSize(data: string, size: number) {
	const beam: Set<string> = new Set();

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (inBeam(data, x, y)) {
				beam.add(`${x},${y}`);
			}
		}
	}

	return beam.size;
}
function locateShip(data: string, size: number) {
	const offset = size - 1;

	for (let y = size; true; y++) {
		for (let x = ~~(y / 1.5); true; x++) {
			if (!inBeam(data, x, y)) {
				continue;
			}

			if (inBeam(data, x, y) && inBeam(data, x + offset, y - offset)) {
				return x * 10000 + (y - offset);
			} else {
				break;
			}
		}
	}
}
