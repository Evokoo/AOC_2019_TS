// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		recipes = parseInput(data);

	calculateOre(recipes);
	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "14");

// Functions
type Recipe = {
	quantity: number;
	inputs: {
		[ID: string]: number;
	};
};
type Recipes = {
	[ID: string]: Recipe;
};

function parseInput(data: string) {
	const recipes: Recipes = {};

	for (let line of data.split("\r\n")) {
		const recipe: Recipe = {
			quantity: 0,
			inputs: {},
		};

		const [inputs, output] = line.split(" => ");
		const [outputQuantity, outputChemical] = output.split(" ");

		recipe.quantity = +outputQuantity;

		for (let input of inputs.split(", ")) {
			const [inputQuantity, inputChemical] = input.split(" ");
			recipe.inputs[inputChemical] = +inputQuantity;
		}

		recipes[outputChemical] = recipe;
	}

	return recipes;
}
function calculateOre(recipes: Recipes) {
	const queue: Recipe[] = [recipes["FUEL"]];
	const required: Record<string, number> = {};

	let ore: number = 0;

	while (queue.length) {
		const current = queue.pop()!;

		for (let [chemical, quantity] of Object.entries(current.inputs)) {
			if (chemical === "ORE") continue;

			required[chemical] = (required[chemical] ?? 0) + quantity;

			const units = Math.ceil(quantity / recipes[chemical].quantity);

			for (let i = 0; i < units; i++) {
				queue.push(recipes[chemical]);
			}
		}
	}
}
