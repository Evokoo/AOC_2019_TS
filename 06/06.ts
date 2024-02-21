// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		tree = parseInput(data),
		count = countOrbits(tree);

	return count;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "06");

// Functions
type Node = { ID: string; children: Node[] };
type Path = { node: Node; path: Set<string> };

function parseInput(data: string): Node {
	const root: Node = { ID: "COM", children: [] };
	const visited = new Set<string>();
	const connections = data.split("\r\n").map((str) => str.split(")"));

	function dfs(node: Node) {
		visited.add(node.ID);

		for (const [a, b] of connections) {
			if (a === node.ID && !visited.has(b)) {
				const newChild: Node = { ID: b, children: [] };
				node.children.push(newChild);
				dfs(newChild);
			} else if (b === node.ID && !visited.has(a)) {
				const newChild: Node = { ID: a, children: [] };
				node.children.push(newChild);
				dfs(newChild); // Recursively explore the child
			}
		}
	}

	dfs(root);

	return root;
}
function countOrbits(root: Node) {
	const queue: Path[] = [{ node: root, path: new Set() }];
	const paths: Record<string, number> = {};

	while (queue.length) {
		const current = queue.shift()!;

		for (let path of current.path) {
			paths[path] = (paths[path] ?? 0) + 1;
		}

		for (let child of current.node.children) {
			queue.push({
				node: child,
				path: new Set([...current.path, current.node.ID]),
			});
		}
	}

	return Object.values(paths).reduce((acc, cur) => acc + cur, 0);
}
