import { BothDefinedError } from "../errors/both-defined-error.js"
import { NoDataError } from "../errors/no-data-error.js"

export class Result<T> {
	constructor(public data?: T, public error?: Error) {
		if (this.hasData() && this.hasError()) {
			throw new BothDefinedError()
		}
	}

	hasData(): boolean {
		return this.data !== undefined && this.data !== null
	}

	hasError(): boolean {
		return this.error !== undefined && this.error !== null
	}

	unwrap(): T {
		const { data, error } = this

		if (error !== null && error !== undefined) {
			throw error
		}

		if (data === null || data === undefined) {
			throw new NoDataError()
		}

		return data
	}
}
