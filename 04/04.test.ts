import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./04";

const currentDay = path.basename(__dirname);

describe(`AOC 2018 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(1231);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(1873);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(898);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(1264);
		});
	});
});
