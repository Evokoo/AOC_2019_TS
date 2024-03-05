// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		deck = shuffleDeck(instructions, 10007);

	return deck.indexOf(2019);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		deck = shuffleDeck(instructions, 119315717514047);

	return 0;
}

//Run
solveB("input", "22");

// Functions
type Instruction = { type: string; value: number };
type Deck = number[];

function parseInput(data: string) {
	const instructions: Instruction[] = [];

	for (let line of data.split("\r\n")) {
		const details = line.split(" ").slice(-2);

		switch (details[0]) {
			case "new":
				instructions.push({ type: "stack", value: 0 });
				break;
			case "cut":
			case "increment":
				instructions.push({ type: details[0], value: +details[1] });
				break;
			default:
				throw Error("Invalid instruction");
		}
	}

	return instructions;
}
function getDeck(size: number): Deck {
	return Array.from({ length: size }, (_, i) => i);
}
function newStack(deck: Deck): Deck {
	return deck.reverse();
}
function cutDeck(deck: Deck, index: number): Deck {
	const left = deck.slice(0, index >= 0 ? index : index + deck.length);
	const right = deck.slice(index);

	return [...right, ...left];
}
function incrementDeck(deck: Deck, step: number): Deck {
	const deckSize = deck.length;
	const newDeck = Array(deckSize).fill(NaN);

	let index = 0;

	while (deck.length) {
		newDeck[index] = deck.shift();
		index = (index + step) % deckSize;
	}

	return newDeck;
}
function shuffleDeck(instructions: Instruction[], deckSize: number) {
	let deck = getDeck(deckSize);

	for (let { type, value } of instructions) {
		switch (type) {
			case "stack":
				deck = newStack(deck);
				break;
			case "cut":
				deck = cutDeck(deck, value);
				break;
			case "increment":
				deck = incrementDeck(deck, value);
				break;
			default:
				throw Error("Invalid instruction");
		}
	}

	return deck;
}
