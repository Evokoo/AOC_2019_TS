// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ panels } = runRobot(data, 0);

	return panels.size;
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		{ registrationCode } = runRobot(data, 1);

	//Log registrationCode to see result
	console.log(registrationCode);

	return "RKURGKGK";
}

//Run
solveB("input", "11");

interface Robot {
	x: number;
	y: number;
	bearing: number;
}
// Functions
function runRobot(data: string, initialColour: number) {
	const size = 100;

	const canvas = Array.from({ length: size }, () =>
		Array.from({ length: size }, () => " ")
	);

	const intComp = new Intcode(data, [initialColour]);
	const panels: Map<string, number> = new Map();
	const robot: Robot = { x: size / 2, y: size / 2, bearing: 180 };

	while (intComp.isActive) {
		intComp.run();

		const [colour, turn] = intComp.outputs.slice(-2);

		panels.set(`${robot.x},${robot.y}`, colour);
		canvas[robot.y][robot.x] = colour === 1 ? "▓" : " ";

		robot.bearing += turn === 0 ? -90 : 90;
		robot.bearing = (robot.bearing + (robot.bearing < 0 ? 360 : 0)) % 360;

		switch (robot.bearing) {
			case 0:
				robot.y++;
				break;
			case 90:
				robot.x++;
				break;
			case 180:
				robot.y--;
				break;
			case 270:
				robot.x--;
				break;
			default:
				throw Error("Invaild bearing");
		}

		intComp.enqueueInput(colour);
	}

	const registrationCode = canvas.map((row) => row.join("")).join("\n");

	return { panels, registrationCode };
}
