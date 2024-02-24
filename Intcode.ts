type Register = Map<number, number>;

export default class Intcode {
	// private _register: number[];
	private _register: Register;
	private _pointer: number;
	private _inputs: number[];
	private _outputs: number[];
	private _active: boolean;
	private _relativeBase: number;

	constructor(data: string, inputs?: number[]) {
		this._register = this.initRegister(data);
		this._inputs = inputs ?? [];
		this._pointer = 0;
		this._outputs = [];
		this._active = true;
		this._relativeBase = 0;
	}

	// Intcode setup
	private initRegister = (data: string): Register => {
		// return data.split(",").map(Number);
		const register: Register = new Map();
		const values = data.split(",").map(Number);

		for (let i = 0; i < values.length; i++) {
			register.set(i, values[i]);
		}

		return register;
	};

	// Intcode register value processing
	private analyseRegisterValue = () => {
		const registerValue = Math.abs(this.getRegisterValue(this._pointer));
		const paddedValue = String(registerValue).padStart(5, "0");

		return {
			code: +paddedValue.slice(-2),
			modes: [...paddedValue.slice(0, 3)].reverse(),
		};
	};
	private getVariables = (code: number, modes: string[]): number[] => {
		let varibles: number[] = [];

		switch (code) {
			case 1:
			case 2:
			case 7:
			case 8:
				varibles = [
					this.getRegisterValue(this._pointer + 1),
					this.getRegisterValue(this._pointer + 2),
					this.getRegisterValue(this._pointer + 3),
				];
				break;
			case 3:
			case 4:
			case 9:
				varibles = [this.getRegisterValue(this._pointer + 1)];
				break;
			case 5:
			case 6:
				varibles = [
					this.getRegisterValue(this._pointer + 1),
					this.getRegisterValue(this._pointer + 2),
				];
				break;
			default:
				return [];
		}

		let offset = 0;

		if ([1, 2, 3, 4, 7, 8, 9].includes(code)) {
			offset = 1;
		}

		for (let i = 0; i < varibles.length - offset; i++) {
			const mode = +modes[i];
			const varible = varibles[i];

			switch (mode) {
				case 0:
					varibles[i] = this.getRegisterValue(varible);
					break;
				case 1:
					break;
				case 2:
					let pointer = varible + this._relativeBase;
					let registerSize = this._register.size;

					if (pointer > registerSize) {
						pointer = pointer % registerSize;
					}

					if (pointer < 0) {
						pointer = (pointer + registerSize) % registerSize;
					}

					varibles[i] = pointer;

					break;
				default:
					throw Error("Invalid mode");
			}
		}

		return varibles;
	};

	// Intcode numbered methods
	private addValues = (varibles: number[]): void => {
		this.setRegisterValue(varibles[2], varibles[0] + varibles[1]);
	};
	private multiplyValues = (varibles: number[]): void => {
		this.setRegisterValue(varibles[2], varibles[0] * varibles[1]);
	};
	private inputValue = (varibles: number[]): boolean => {
		if (this._inputs.length) {
			this.setRegisterValue(varibles[0], this._inputs.shift()!);
			// this._register[varibles[0]] = this._inputs.shift()!;
			return false;
		} else {
			return true;
		}
	};
	private outputValue = (varibles: number[]): void => {
		// console.log(varibles);
		this._outputs.push(this.getRegisterValue(varibles[0]));
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
		this.setRegisterValue(varibles[2], varibles[0] < varibles[1] ? 1 : 0);
	};
	private isEqual = (varibles: number[]): void => {
		this.setRegisterValue(varibles[2], varibles[0] === varibles[1] ? 1 : 0);
	};
	private updateRelativeValue = (varibles: number[]): void => {
		this._relativeBase += varibles[0];
	};

	//PUBLIC METHODS

	// Add an input value
	public enqueueInput = (value: number) => {
		this._inputs.push(value);
	};
	public setRegisterValue = (pointer: number, value: number) => {
		if (pointer < 0) throw RangeError("Pointer cannot be negative");
		this._register.set(pointer, value);
	};
	public getRegisterValue = (pointer: number) => {
		if (pointer < 0) throw RangeError("Pointer cannot be negative");
		return this._register.get(pointer) ?? 0;
	};

	// Run Intocde class
	public run = () => {
		const { code, modes } = this.analyseRegisterValue();
		const varibles = this.getVariables(code, modes);

		// console.log({ code, modes, varibles, base: this._relativeBase });

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
			case 9:
				this.updateRelativeValue(varibles);
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
	get register(): Register {
		return this._register;
	}
	// Get Outputs
	get outputs(): number[] {
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
