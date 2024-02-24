// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		intComp = new Intcode(data, [1]);

	intComp.run();

	return intComp.lastOutput;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		intComp = new Intcode(data, [5]);

	intComp.run();

	return intComp.lastOutput;
}

//Run
solveB("input", "05");
