// Imports
import TOOLS from "../00/tools";
import Intcode from "../Intcode";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ steps } = runDroid(data);

	return steps;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ x, y } = runDroid(data),
		time = spreadOxygen(data, { x, y });

	return time;
}

//Run
// solveB("input", "15");

// Functions
type Path = { x: number; y: number; droid: Intcode; steps: number };
type Point = { x: number; y: number };

function runDroid(data: string) {
	const seen: Set<string> = new Set();
	const walls: Set<string> = new Set();
	const queue: Path[] = [{ x: 0, y: 0, droid: new Intcode(data), steps: 0 }];

	while (true) {
		const current = queue.pop()!;
		const coord = `${current.x},${current.y}`;

		if (seen.has(coord) || walls.has(coord)) {
			continue;
		} else {
			seen.add(coord);
		}

		for (let i = 1; i <= 4; i++) {
			const clone = current.droid.clone();
			clone.enqueueInput(i);
			clone.run();

			switch (clone.lastOutput) {
				case 0:
					switch (i) {
						case 1:
							walls.add(`${current.x},${current.y + 1}`);
							break;
						case 2:
							walls.add(`${current.x},${current.y - 1}`);
							break;
						case 3:
							walls.add(`${current.x - 1},${current.y}`);
							break;
						case 4:
							walls.add(`${current.x + 1},${current.y}`);
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
					return {
						x: current.x,
						y: current.y,
						steps: current.steps + 1,
					};
				default:
					throw Error("Invalid Result");
			}
		}
	}
}
function getArea(data: string) {
	const area: Set<string> = new Set();
	const queue: Path[] = [{ x: 0, y: 0, droid: new Intcode(data), steps: 0 }];

	while (queue.length) {
		const current = queue.pop()!;
		const coord = `${current.x},${current.y}`;

		if (area.has(coord)) {
			continue;
		} else {
			area.add(coord);
		}

		for (let i = 1; i <= 4; i++) {
			const clone = current.droid.clone();
			clone.enqueueInput(i);
			clone.run();

			switch (clone.lastOutput) {
				case 0:
					break;
				case 1:
				case 2:
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
				default:
					throw Error("Invalid Result");
			}
		}
	}

	return area;
}
function spreadOxygen(data: string, start: Point) {
	const area: Set<string> = getArea(data);
	const queue = [{ x: start.x, y: start.y, minute: 0 }];
	const time: Set<number> = new Set();

	while (queue.length) {
		const current = queue.shift()!;
		const coord = `${current.x},${current.y}`;

		if (area.has(coord)) {
			area.delete(coord);
		}

		for (let [nx, ny] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		]) {
			const [x, y] = [current.x + nx, current.y + ny];
			const adjacentCoord = `${x},${y}`;

			if (area.has(adjacentCoord)) {
				queue.push({ x, y, minute: current.minute + 1 });
			} else {
				continue;
			}
		}

		time.add(current.minute);
	}

	return time.size;
}
