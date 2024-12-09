export class BothDefinedError extends Error {
	constructor() {
		super("Both result and error were defined, this is not allowed")
		this.name = "BothDefinedError"
	}
}
