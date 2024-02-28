// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);

	runIntCode(data);
	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "13");

// Functions
function runIntCode(data: string) {
	const intComp = new Intcode(data);
}
