// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		layers = parseInput(data, 25, 6),
		result = findLayer(layers);

	return result;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "08");

type Layer = { ID: number; rows: string[]; digitCount: Record<string, number> };

// Functions
function parseInput(data: string, width: number, height: number) {
	const layers: Layer[] = [];

	for (let i = 0; i < data.length; i += width * height) {
		const count: Record<string, number> = {};
		const rows = [];

		let row = [];

		for (let digit of data.slice(i, i + width * height)) {
			count[digit] = (count[digit] ?? 0) + 1;

			row.push(digit);

			if (row.length === width) {
				rows.push(row.join(""));
				row = [];
			}
		}

		layers.push({ ID: layers.length, rows, digitCount: count });
	}

	return layers;
}
function findLayer(layers: Layer[]) {
	let bestLayer = layers[0];

	for (let layer of layers) {
		if (layer.digitCount["0"] < bestLayer.digitCount["0"]) {
			bestLayer = layer;
		}
	}

	return bestLayer.digitCount["1"] * bestLayer.digitCount["2"];
}
