// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		register = parseIntput(data),
		value = runIntCodes(register);

	return value;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		value = findPair(data, 19690720);

	return value;
}

//Run
solveB("input", "02");

// Functions
function parseIntput(data: string) {
	const register = (data.match(/\d+/g) || []).map(Number);

	if (register.length > 15) {
		register[1] = 12;
		register[2] = 2;
	}

	return register;
}
function runIntCodes(register: number[]) {
	for (let i = 0; i < register.length; i += 4) {
		const code = register[i];

		if (code === 1) {
			const [a, b, c] = register.slice(i + 1, i + 4);
			register[c] = register[a] + register[b];
		}

		if (code === 2) {
			const [a, b, c] = register.slice(i + 1, i + 4);
			register[c] = register[a] * register[b];
		}

		if (code === 99) {
			break;
		}
	}

	return register[0];
}
function findPair(data: string, target: number) {
	for (let noun = 0; noun < 99; noun++) {
		for (let verb = 0; verb < 99; verb++) {
			const register = parseIntput(data);

			register[1] = noun;
			register[2] = verb;

			if (runIntCodes(register) === target) {
				return 100 * noun + verb;
			}
		}
	}

	throw Error("Value not found");
}
