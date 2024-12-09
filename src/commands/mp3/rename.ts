/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
import { input } from "@inquirer/prompts"
import { Args, Command, Flags } from "@oclif/core"
import { existsSync, lstatSync } from "node:fs"
import path from "node:path"

import { Mp3Model } from "../../models/mp3-model.js"
import { Result } from "../../models/result.js"

async function fixManually(dir: string, results: Map<string, Result<boolean>>) {
	for (const [filename, result] of results) {
		const filePath = `${dir}/${filename}`
		if (result.data) {
			continue
		}

		const mp3Info = Mp3Model.getMp3Info(filePath)
		if (mp3Info.hasError()) {
			console.warn(`error could not read info of ${filePath}`)
			continue
		}

		const { tags } = mp3Info.unwrap()
		if (tags.artist !== "" && tags.title !== "") {
			return
		}

		let artist: string = tags.artist
		let title: string = tags.title

		let artistSuggestion: string | undefined
		let titleSuggestion: string | undefined
		const splits = filename.split("-")
		if (splits.length > 1) {
			artistSuggestion = splits[0].trim()
			splits.shift()
			titleSuggestion = splits.join("-")
		}

		console.log(`file: ${filePath} is incomplete, please enter info manually.`)
		if (artist === "") {
			artist = (
				await input({ default: artistSuggestion, message: "Enter artist:" })
			).trim()
		}

		if (title === "") {
			title = (
				await input({ default: titleSuggestion, message: "Enter title:" })
			).trim()
		}

		await Mp3Model.setTags(filePath, artist, title)
		await Mp3Model.fileRename(filePath, artist, title, "mp3")
	}
}

export default class Rename extends Command {
	static args = {
		input: Args.string({
			description: "File or folder to rename.",
			required: true,
		}),
	}

	static description =
		"Renames a single file, or whole folder of files based on mp3 tags."

	static examples = [
		`<%= config.bin %> <%= command.id %> ./folder`,
		`<%= config.bin %> <%= command.id %> ./file.mp3`,
	]

	static flags = {
		interactive: Flags.boolean({
			char: "i",
			default: false,
			description: "Ask for user input if information is incomplete",
		}),
		verbose: Flags.boolean({
			char: "v",
			default: false,
			description: "Verbose mode",
		}),
	}

	async run(): Promise<void> {
		const { args, flags } = await this.parse(Rename)

		if (!existsSync(args.input)) {
			throw new Error(`File ${args.input} does not exist`)
		}

		const fileStats = lstatSync(args.input)

		if (fileStats.isDirectory()) {
			const results = await Mp3Model.dirRenameFromTags(args.input)
			if (flags.interactive) {
				fixManually(args.input, results)
			}
		} else {
			const result = await Mp3Model.fileRenameFromTags(args.input)
			if (flags.interactive) {
				const fileInfo = path.parse(args.input)
				const filename = `${fileInfo.name}${fileInfo.ext}`
				fixManually(fileInfo.dir, new Map([[filename, result]]))
			}
		}
	}
}
