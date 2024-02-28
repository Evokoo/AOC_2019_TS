// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		moons = parseInput(data),
		steps = fileName.startsWith("example") ? 100 : 1000,
		energy = runSimulation(moons, steps);

	return energy;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		moons = parseInput(data),
		step = findCycle(moons);

	return step;
}

//Run
// solveB("example_b", "12");

type XYZ = { x: number; y: number; z: number; [key: string]: number };
type Moon = { pos: XYZ; vel: XYZ };

// Functions
function parseInput(data: string) {
	const moons: Moon[] = [];

	for (let line of data.split("\r\n")) {
		const [x, y, z] = (line.match(/-*\d+/g) || []).map(Number);

		moons.push({
			pos: { x, y, z },
			vel: { x: 0, y: 0, z: 0 },
		});
	}

	return moons;
}
function runSimulation(moons: Moon[], steps: number) {
	for (let i = 0; i < steps; i++) {
		moons = updateVelocity(moons);
		moons = updatePosition(moons);
	}

	return getSystemEnergy(moons);
}
function findCycle(moons: Moon[]) {
	let states = { x: new Set(), y: new Set(), z: new Set() };

	function getStates(moons: Moon[]) {
		const [x, y, z]: number[][] = [[], [], []];

		for (let moon of moons) {
			x.push(moon.pos.x, moon.vel.x);
			y.push(moon.pos.y, moon.vel.y);
			z.push(moon.pos.z, moon.vel.z);
		}

		return [x, y, z].map((arr) => arr.join(","));
	}

	let [stepX, stepY, stepZ] = [0, 0, 0];

	for (let i = 0; true; i++) {
		const [x, y, z] = getStates(moons);

		if (stepX === 0) {
			if (states.x.has(x)) {
				stepX = i;
			} else {
				states.x.add(x);
			}
		}

		if (stepY === 0) {
			if (states.y.has(y)) {
				stepY = i;
			} else {
				states.y.add(y);
			}
		}

		if (stepZ === 0) {
			if (states.z.has(z)) {
				stepZ = i;
			} else {
				states.z.add(z);
			}
		}

		if (stepX !== 0 && stepY !== 0 && stepZ !== 0) {
			break;
		}

		moons = updateVelocity(moons);
		moons = updatePosition(moons);
	}

	return TOOLS.arrLCM([stepX, stepY, stepZ]);
}
function updateVelocity(moons: Moon[]) {
	for (let i = 0; i < moons.length; i++) {
		const moonA = moons[i].pos;

		for (let j = i + 1; j < moons.length; j++) {
			const moonB = moons[j].pos;

			for (let param of ["x", "y", "z"]) {
				if (moonA[param] > moonB[param]) {
					moons[j].vel[param]++;
					moons[i].vel[param]--;
				}

				if (moonA[param] < moonB[param]) {
					moons[j].vel[param]--;
					moons[i].vel[param]++;
				}
			}
		}
	}

	return moons;
}
function updatePosition(moons: Moon[]) {
	return moons.map(({ pos, vel }) => {
		pos.x += vel.x;
		pos.y += vel.y;
		pos.z += vel.z;

		return { pos, vel };
	});
}
function getSystemEnergy(moons: Moon[]) {
	return moons.reduce((sum: number, { pos, vel }: Moon) => {
		const potential = Math.abs(pos.x) + Math.abs(pos.y) + Math.abs(pos.z);
		const kinetic = Math.abs(vel.x) + Math.abs(vel.y) + Math.abs(vel.z);
		return sum + potential * kinetic;
	}, 0);
}
