export class CommandError extends Error {
	constructor(public command: string, public stderr: string) {
		super(`Command ${command} resulted in error: \n${stderr}`)
		this.name = "CommandError"
	}
}
