export class NoDataError extends Error {
	constructor() {
		super("Tried to unwrap a result that had no data")
		this.name = "NoDataError"
	}
}
