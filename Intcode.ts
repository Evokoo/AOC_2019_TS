export default class Intcode {
	private _register: number[];
	private _pointer: number;
	private _inputs: number[];
	private _outputs: number[];
	private _active: boolean;

	constructor(data: string, inputs?: number[]) {
		this._register = this.initRegister(data);
		this._inputs = inputs ?? [];
		this._pointer = 0;
		this._outputs = [];
		this._active = true;
	}

	// Intcode setup
	private initRegister = (data: string): number[] => {
		return data.split(",").map(Number);
	};

	// Intcode register value processing
	private analyseRegisterValue = () => {
		const registerValue = Math.abs(this._register[this._pointer]);
		const paddedValue = String(registerValue).padStart(5, "0");

		return {
			code: +paddedValue.slice(-2),
			modes: [...paddedValue.slice(0, 3)].reverse(),
		};
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

	// Intcode numbered methods
	private addValues = (varibles: number[]): void => {
		this._register[varibles[2]] = varibles[0] + varibles[1];
	};
	private multiplyValues = (varibles: number[]): void => {
		this._register[varibles[2]] = varibles[0] * varibles[1];
	};
	private inputValue = (varibles: number[]): boolean => {
		if (this._inputs.length) {
			this._register[varibles[0]] = this._inputs.shift()!;
			return false;
		} else {
			return true;
		}
	};
	private outputValue = (varibles: number[]): void => {
		this._outputs.push(this.register[varibles[0]]);
	};
	private isNotZero = (varibles: number[]): boolean => {
		if (varibles[0] !== 0) {
			this._pointer = varibles[1];
			return true;
		} else {
			return false;
		}
	};
	private isZero = (varibles: number[]): boolean => {
		if (varibles[0] === 0) {
			this._pointer = varibles[1];
			return true;
		} else {
			return false;
		}
	};
	private isLessThan = (varibles: number[]): void => {
		this._register[varibles[2]] = varibles[0] < varibles[1] ? 1 : 0;
	};
	private isEqual = (varibles: number[]): void => {
		this._register[varibles[2]] = varibles[0] === varibles[1] ? 1 : 0;
	};

	//PUBLIC METHODS

	// Add an input value
	public enqueueInput = (value: number) => {
		this._inputs.push(value);
	};
	public setRegisterValue = (pointer: number, value: number) => {
		this._register[pointer] = value;
	};
	public getRegisterValue = (pointer: number) => {
		if (!this._register[pointer]) {
			throw RangeError("Value not found at the specified pointer");
		}

		return this._register[pointer];
	};

	// Run Intocde class
	public run = () => {
		const { code, modes } = this.analyseRegisterValue();
		const varibles = this.getVariables(code, modes);

		let jump = false;

		switch (code) {
			case 99:
				this._active = false;
				return;
			case 1:
				this.addValues(varibles);
				break;
			case 2:
				this.multiplyValues(varibles);
				break;
			case 3:
				const exit = this.inputValue(varibles);
				if (exit) return;
				break;
			case 4:
				this.outputValue(varibles);
				break;
			case 5:
				jump = this.isNotZero(varibles);
				break;
			case 6:
				jump = this.isZero(varibles);
				break;
			case 7:
				this.isLessThan(varibles);
				break;
			case 8:
				this.isEqual(varibles);
				break;
			default:
				break;
		}

		if (!jump) {
			this._pointer += varibles.length + 1;
		}

		this.run();
	};

	//GETTERS & SETTERS

	// Get Registers
	get register(): number[] {
		return this._register;
	}
	// Get Outputs
	get ouputs(): number[] {
		return this._outputs;
	}
	// Get last output
	get lastOutput(): number {
		return this._outputs[this._outputs.length - 1];
	}
	// Check comp status
	get isActive(): boolean {
		return this._active;
	}
}
