import { Args, Command, Flags } from "@oclif/core"
import { existsSync } from "node:fs"

import { Mp3Model } from "../../models/mp3-model.js"

export default class Rename extends Command {
	static args = {
		input: Args.string({
			description: "File or folder to rename.",
			required: true,
		}),
	}

	static description = "Sets the tag for a file."

	static examples = [
		`<%= config.bin %> <%= command.id %> ./folder`,
		`<%= config.bin %> <%= command.id %> ./file.mp3`,
	]

	static flags = {
		artist: Flags.string({
			char: "a",
			description: "The artist of the song",
			required: true,
		}),
		title: Flags.string({
			char: "t",
			description: "The title of the song",
			required: true,
		}),
	}

	async run(): Promise<void> {
		const { args, flags } = await this.parse(Rename)

		if (!existsSync(args.input)) {
			throw new Error(`File ${args.input} does not exist`)
		}

		Mp3Model.setTags(args.input, flags.artist, flags.title)
	}
}
