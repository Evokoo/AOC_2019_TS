// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		moduleArr = parseInput(data),
		fuelRequired = calculateFuel(moduleArr);

	return fuelRequired;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		moduleArr = parseInput(data),
		fuelRequired = calculateFuel(moduleArr, true);

	return fuelRequired;
}

//Run
solveB("example_b", "01");

// Functions
function parseInput(data: string) {
	const moduleArr: number[] = [];

	for (let line of data.split("\r\n")) {
		moduleArr.push(+line);
	}

	return moduleArr;
}
function calculateFuel(moduleArr: number[], partB: boolean = false) {
	if (partB) {
		return moduleArr.reduce((total, mass) => {
			let fuel = 0;

			while (mass > 0) {
				let f = ~~(mass / 3) - 2;
				fuel += f > 0 ? f : 0;
				mass = f;
			}

			return total + fuel;
		}, 0);
	} else {
		let fuelRequired = 0;

		for (let mass of moduleArr) {
			fuelRequired += ~~(mass / 3) - 2;
		}

		return fuelRequired;
	}
}
