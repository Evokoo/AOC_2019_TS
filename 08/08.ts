// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		layers = parseInput(data, 25, 6),
		result = findLayer(layers);

	return result;
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		layers = parseInput(data, 25, 6),
		image = decodeLayers(layers);

	//Visually inspect image to see message
	console.log(image);

	return "UGCUH";
}

//Run
// solveB("input", "08");

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

	for (let layer of layers.slice(1)) {
		if (layer.digitCount["0"] < bestLayer.digitCount["0"]) {
			bestLayer = layer;
		}
	}

	return bestLayer.digitCount["1"] * bestLayer.digitCount["2"];
}
function decodeLayers(layers: Layer[]) {
	const pixels = layers.at(-1)!.rows.map((row) => [...row]);

	for (let i = layers.length - 2; i >= 0; i--) {
		const layerPixels = layers[i].rows;

		for (let y = 0; y < layerPixels.length; y++) {
			for (let x = 0; x < layerPixels[0].length; x++) {
				const pixel = layerPixels[y][x];

				switch (pixel) {
					case "0":
					case "1":
						pixels[y][x] = pixel;
						break;
					case "2":
						break;
					default:
						throw Error("Invalid pixel");
				}
			}
		}
	}

	const image = pixels
		.map((row) => row.join("").replace(/./g, ($) => ($ === "0" ? " " : "#")))
		.join("\n");

	return image;
}
