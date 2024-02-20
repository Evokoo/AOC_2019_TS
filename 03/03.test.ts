import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./03";

const currentDay = path.basename(__dirname);

describe(`AOC 2019 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(135);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(303);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(410);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(11222);
		});
	});
});
