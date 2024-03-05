import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./22";

const currentDay = path.basename(__dirname);

describe(`AOC 2019 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		// test("Example", () => {
		// 	expect(solveA("example_a", currentDay)).toBe(null);
		// });

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(1252);
		});
	});

	// describe("Part B", () => {
	// 	test("Example", () => {
	// 		expect(solveB("example_b", currentDay)).toBe(null);
	// 	});

	// 	test("Solution", () => {
	// 		expect(solveB("input", currentDay)).toBe(null);
	// 	});
	// });
});
