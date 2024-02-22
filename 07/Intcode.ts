export default class Intcode {
	private _register: number[];
	private _pointer: number;
	private _inputs: number[];
	private _log: number[];

	public running: boolean;

	constructor(data: string, inputs: number[]) {
		this._register = this.parseInput(data);
		this._inputs = inputs;
		this._pointer = 0;
		this._log = [];
		this.running = true;
	}

	private parseInput = (data: string): number[] => {
		return data.split(",").map(Number);
	};
	private analyseRegisterValue = () => {
		const value = String(Math.abs(this._register[this._pointer])).padStart(
			5,
			"0"
		);
		const code = +value.slice(-2);
		const modes = [...value.slice(0, 3)].reverse();

		return { code, modes };
	};
	private getVariables = (code: number, modes: string[]): number[] => {
		let varibles: number[];

		switch (code) {
			case 1:
			case 2:
			case 7:
			case 8:
				varibles = this._register.slice(this._pointer + 1, this._pointer + 4);
				break;
			case 3:
			case 4:
				varibles = [this._register[this._pointer + 1]];
				break;
			case 5:
			case 6:
				varibles = [
					this.register[this._pointer + 1],
					this.register[this._pointer + 2],
				];
				break;
			default:
				return [];
		}

		if (varibles.length === 1) {
			return varibles;
		} else {
			return varibles.map((val, index) => {
				if (varibles.length === 3) {
					return index < varibles.length - 1 && modes[index] === "0"
						? this.register[val]
						: val;
				} else {
					return modes[index] === "0" ? this.register[val] : val;
				}
			});
		}
	};

	run = () => {
		const { code, modes } = this.analyseRegisterValue();
		const varibles = this.getVariables(code, modes);

		if (code === 99) {
			this.running = false;
			return;
		}

		let jump = false;

		switch (code) {
			case 1:
				this._register[varibles[2]] = varibles[0] + varibles[1];
				break;
			case 2:
				this._register[varibles[2]] = varibles[0] * varibles[1];
				break;
			case 3:
				this._register[varibles[0]] = this._inputs.shift() ?? this.lastLog;
				break;
			case 4:
				this._log.push(this.register[varibles[0]]);
				break;
			case 5:
				if (varibles[0] !== 0) {
					this._pointer = varibles[1];
					jump = true;
				}
				break;
			case 6:
				if (varibles[0] === 0) {
					this._pointer = varibles[1];
					jump = true;
				}
				break;
			case 7:
				this._register[varibles[2]] = varibles[0] < varibles[1] ? 1 : 0;
				break;
			case 8:
				this._register[varibles[2]] = varibles[0] === varibles[1] ? 1 : 0;
				break;
			default:
				break;
		}

		if (!jump) this._pointer += varibles.length + 1;

		this.run();
	};

	get register(): number[] {
		return this._register;
	}

	get log(): number[] {
		return this._log;
	}

	get lastLog(): number {
		return this._log[this._log.length - 1];
	}

	addinput = (value: number) => {
		this._inputs.push(value);
	};
}
