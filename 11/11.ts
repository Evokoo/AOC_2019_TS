// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		panels = runRobot(data);

	return panels.size;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "11");

interface Robot {
	x: number;
	y: number;
	bearing: number;
}

// Functions
function runRobot(data: string) {
	const intComp = new Intcode(data, [0]);
	const hull: Map<string, number> = new Map();

	const robot: Robot = { x: 0, y: 0, bearing: 0 };

	while (intComp.isActive) {
		intComp.run();

		const [colour, turn] = intComp.outputs.slice(-2);

		hull.set(`${robot.x},${robot.y}`, colour);

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

		intComp.enqueueInput(hull.get(`${robot.x},${robot.y}`) ?? 0);
	}

	return hull;
}
