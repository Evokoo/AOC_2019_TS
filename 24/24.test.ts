import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./24";

const currentDay = path.basename(__dirname);

describe(`AOC 2019 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(2129920);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(18370591);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(null);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(null);
		});
	});
});
