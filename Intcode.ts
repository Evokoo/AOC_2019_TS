type Register = Map<number, number>;

export default class Intcode {
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

	private initRegister = (data: string): Register => {
		const register: Register = new Map();
		const values = data.split(",").map(Number);

		for (let i = 0; i < values.length; i++) {
			register.set(i, values[i]);
		}

		return register;
	};
	private getValue = (mode: number, pointer: number) => {
		switch (mode) {
			case 0:
				return this.getRegisterValue(this.getRegisterValue(pointer));
			case 1:
				return this.getRegisterValue(pointer);
			case 2:
				return this.getRegisterValue(
					this.getRegisterValue(pointer) + this._relativeBase
				);
			default:
				throw Error("Invalid Mode");
		}
	};
	private getAddress = (mode: number, pointer: number): number => {
		switch (mode) {
			case 0:
				return this.getRegisterValue(pointer);
			case 2:
				return this.getRegisterValue(pointer) + this._relativeBase;
			default:
				throw Error("Invalid Mode");
		}
	};

	//PUBLIC METHODS
	public enqueueInput = (value: number) => {
		this._inputs.push(value);
	};
	public setRegisterValue = (pointer: number, value: number) => {
		this._register.set(pointer, value);
	};
	public getRegisterValue = (pointer: number) => {
		return this._register.get(pointer) ?? 0;
	};
	public run = () => {
		// console.log("Intcode Running...");

		while (this.isActive) {
			const registerValue = `${this.getRegisterValue(this._pointer)}`;
			const instruction = registerValue.padStart(5, "0");

			const opcode = +instruction.slice(3);
			const modes = [...instruction.slice(0, 3)].reverse();

			//#1 ADD
			if (opcode === 1) {
				const a = this.getValue(+modes[0], this._pointer + 1);
				const b = this.getValue(+modes[1], this._pointer + 2);
				const c = this.getAddress(+modes[2], this._pointer + 3);

				this.setRegisterValue(c, a + b);
				this._pointer += 4;
			}

			//#2 MULTIPLY
			if (opcode === 2) {
				const a = this.getValue(+modes[0], this._pointer + 1);
				const b = this.getValue(+modes[1], this._pointer + 2);
				const c = this.getAddress(+modes[2], this._pointer + 3);

				this.setRegisterValue(c, a * b);
				this._pointer += 4;
			}

			//#3 RECIEVE INPUT
			if (opcode === 3) {
				const a = this.getAddress(+modes[0], this._pointer + 1);

				if (this._inputs.length) {
					this.setRegisterValue(a, this._inputs.shift()!);
					this._pointer += 2;
				} else {
					return;
				}
			}

			//#4 SEND OUTPUT
			if (opcode === 4) {
				const a = this.getValue(+modes[0], this._pointer + 1);
				this._outputs.push(a);
				this._pointer += 2;
			}

			//#5 JUMP IF NOT ZERO
			if (opcode === 5) {
				const a = this.getValue(+modes[0], this._pointer + 1);
				const b = this.getValue(+modes[1], this._pointer + 2);

				if (a !== 0) {
					this._pointer = b;
				} else {
					this._pointer += 3;
				}
			}

			//#6 JUMP IF ZERO
			if (opcode === 6) {
				const a = this.getValue(+modes[0], this._pointer + 1);
				const b = this.getValue(+modes[1], this._pointer + 2);

				if (a === 0) {
					this._pointer = b;
				} else {
					this._pointer += 3;
				}
			}

			//#7 LESS THAN
			if (opcode === 7) {
				const a = this.getValue(+modes[0], this._pointer + 1);
				const b = this.getValue(+modes[1], this._pointer + 2);
				const c = this.getAddress(+modes[2], this._pointer + 3);

				this.setRegisterValue(c, a < b ? 1 : 0);
				this._pointer += 4;
			}

			//#8 EQUAL
			if (opcode === 8) {
				const a = this.getValue(+modes[0], this._pointer + 1);
				const b = this.getValue(+modes[1], this._pointer + 2);
				const c = this.getAddress(+modes[2], this._pointer + 3);

				this.setRegisterValue(c, a === b ? 1 : 0);
				this._pointer += 4;
			}

			//#99 EXIT
			if (opcode === 9) {
				const a = this.getValue(+modes[0], this._pointer + 1);

				this._relativeBase += a;
				this._pointer += 2;
			}

			if (opcode === 99) {
				this._active = false;
			}
		}
	};

	public clone = (): Intcode => {
		const clone = new Intcode("0");
		clone._register = new Map(this._register.entries());
		return clone;
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
