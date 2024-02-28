// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		intComp = new Intcode(data),
		blocks = countBlocks(intComp);

	return blocks;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "13");

type Tiles = Map<string, number>;

// Functions

function countBlocks(intComp: Intcode) {
	let blocks = 0;

	intComp.run();

	const instructions = intComp.outputs;

	for (let i = 0; i < instructions.length; i += 3) {
		const [_x, _y, tile] = instructions.slice(i, i + 3);

		if (tile === 2) {
			blocks++;
		}
	}

	return blocks;
}
