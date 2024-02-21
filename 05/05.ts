// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		register = parseInput(data),
		diagnosticCode = runIntCodes(register, 1);

	return diagnosticCode;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		register = parseInput(data),
		diagnosticCode = runIntCodes(register, 5);

	return diagnosticCode;
}

//Run
// solveB("input", "05");

// Functions
function parseInput(data: string) {
	return data.split(",").map(Number);
}
function runIntCodes(register: number[], input: number) {
	function analyseRegisterValue(pointer: number) {
		const value = String(Math.abs(register[pointer])).padStart(5, "0");
		const code = +value.slice(-2);
		const modes = [...value.slice(0, 3)].reverse();

		return { code, modes };
	}
	function getVariables(pointer: number, code: number, modes: string[]) {
		let varibles: number[];

		switch (code) {
			case 1:
			case 2:
			case 7:
			case 8:
				varibles = register.slice(pointer + 1, pointer + 4);
				break;
			case 3:
			case 4:
				varibles = [register[pointer + 1]];
				break;
			case 5:
			case 6:
				varibles = [register[pointer + 1], register[pointer + 2]];
				break;
			default:
				return [];
		}

		if (varibles.length === 1) {
			return varibles;
		} else {
			return varibles.map((val, index) => {
				if (varibles.length === 3) {
					return index < varibles.length - 1 && modes[index] === "0"
						? register[val]
						: val;
				} else {
					return modes[index] === "0" ? register[val] : val;
				}
			});
		}
	}

	const diagnosticLog = [];

	for (let pointer = 0; true; ) {
		const { code, modes } = analyseRegisterValue(pointer);
		const varibles = getVariables(pointer, code, modes);

		//Exit condition
		if (code === 99) break;

		let jump = false;

		switch (code) {
			case 1:
				register[varibles[2]] = varibles[0] + varibles[1];
				break;
			case 2:
				register[varibles[2]] = varibles[0] * varibles[1];
				break;
			case 3:
				register[varibles[0]] = input;
				break;
			case 4:
				diagnosticLog.push(register[varibles[0]]);
				break;
			case 5:
				if (varibles[0] !== 0) {
					pointer = varibles[1];
					jump = true;
				}
				break;
			case 6:
				if (varibles[0] === 0) {
					pointer = varibles[1];
					jump = true;
				}
				break;
			case 7:
				register[varibles[2]] = varibles[0] < varibles[1] ? 1 : 0;
				break;
			case 8:
				register[varibles[2]] = varibles[0] === varibles[1] ? 1 : 0;
				break;
			default:
				break;
		}

		if (jump) {
			continue;
		} else {
			pointer += varibles.length + 1;
		}
	}

	return diagnosticLog.at(-1)!;
}
