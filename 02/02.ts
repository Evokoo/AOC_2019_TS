// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		intComp = new Intcode(data);

	if (intComp.register.length > 15) {
		intComp.setRegisterValue(1, 12);
		intComp.setRegisterValue(2, 2);
	}

	intComp.run();

	return intComp.getRegisterValue(0);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);

	for (let noun = 0; noun < 99; noun++) {
		for (let verb = 0; verb < 99; verb++) {
			const intComp = new Intcode(data);

			intComp.setRegisterValue(1, noun);
			intComp.setRegisterValue(2, verb);
			intComp.run();

			if (intComp.getRegisterValue(0) === 19690720) {
				return 100 * noun + verb;
			}
		}
	}

	throw Error("Pair not found");
}

//Run
solveB("input", "02");
