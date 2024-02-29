// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";
import _ from "lodash";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		steps = runDroid(data);
	return steps;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "15");

// Functions
type Path = { x: number; y: number; droid: Intcode; steps: number };

function runDroid(data: string) {
	const seen: Set<string> = new Set();
	const queue: Path[] = [{ x: 0, y: 0, droid: new Intcode(data), steps: 0 }];

	while (true) {
		const current = queue.pop()!;

		if (seen.has(`${current.x},${current.y}`)) {
			continue;
		} else {
			seen.add(`${current.x},${current.y}`);
		}

		for (let i = 1; i <= 4; i++) {
			const clone = current.droid.clone();
			clone.enqueueInput(i);
			clone.run();

			switch (clone.lastOutput) {
				case 0:
					switch (i) {
						case 1:
							seen.add(`${current.x},${current.y + 1}`);
							break;
						case 2:
							seen.add(`${current.x},${current.y - 1}`);
							break;
						case 3:
							seen.add(`${current.x - 1},${current.y}`);
							break;
						case 4:
							seen.add(`${current.x + 1},${current.y}`);
							break;
					}
					break;
				case 1:
					switch (i) {
						case 1:
							queue.push({
								x: current.x,
								y: current.y + 1,
								droid: clone,
								steps: current.steps + 1,
							});
							break;
						case 2:
							queue.push({
								x: current.x,
								y: current.y - 1,
								droid: clone,
								steps: current.steps + 1,
							});
							break;
						case 3:
							queue.push({
								x: current.x - 1,
								y: current.y,
								droid: clone,
								steps: current.steps + 1,
							});
							break;
						case 4:
							queue.push({
								x: current.x + 1,
								y: current.y,
								droid: clone,
								steps: current.steps + 1,
							});
							break;
					}
					break;
				case 2:
					return current.steps + 1;
				default:
					throw Error("Invalid Result");
			}
		}
	}
}
