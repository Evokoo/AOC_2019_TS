// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

// Solutions;
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		screen = getScreen(data);

	return screen.block.size;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		score = play(data);

	return 0;
}

//Run
solveB("input", "13");

type Screen = { [key: string]: Set<string> };
type Input = { x: number; y: number; score: number };
type Ball = { x: number; y: number; direction: number };

// Functions
function getScreen(data: string) {
	const comp = new Intcode(data);
	const screen: Screen = {
		wall: new Set(),
		block: new Set(),
		paddle: new Set(),
		ball: new Set(),
	};

	comp.run();

	const instructions = comp.outputs;

	for (let i = 0; i < instructions.length; i += 3) {
		const [x, y, tile] = instructions.slice(i, i + 3);
		const coord = `${x},${y}`;

		switch (tile) {
			case 0:
				break;
			case 1:
				screen.wall.add(coord);
				break;
			case 2:
				screen.block.add(coord);
				break;
			case 3:
				screen.paddle.add(coord);
				break;
			case 4:
				screen.ball.add(coord);
				break;
			default:
				throw Error("Invalid tile");
		}
	}
	return screen;
}
function getInputs(data: string) {
	const comp = new Intcode(data.replace(/^\d/, "2"));
	const inputs: Input[] = [];

	comp.setRegisterValue(0, 2);
	comp.run();

	const outputs = comp.outputs;

	console.log(outputs);

	for (let i = 0; i < outputs.length; i += 3) {
		const [x, y, score] = outputs.slice(i, i + 3);
		inputs.push({ x, y, score });
	}

	return inputs;
}

function play(data: string) {
	// const screen: Screen = getScreen(data);
	const inputs: Input[] = getInputs(data);
	// const ball: Ball = {
	// 	x: +[...screen.ball][0].split(",")[0],
	// 	y: +[...screen.ball][0].split(",")[1],
	// 	direction: 0,
	// };

	console.log(inputs);
}
