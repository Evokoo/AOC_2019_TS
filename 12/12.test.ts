import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./12";

const currentDay = path.basename(__dirname);

describe(`AOC 2019 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(1940);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(14606);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(4686774924);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(543673227860472);
		});
	});
});
