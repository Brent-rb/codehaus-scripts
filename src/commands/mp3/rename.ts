/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
import { input } from "@inquirer/prompts"
import { Args, Command, Flags } from "@oclif/core"
import { Dirent, existsSync, lstatSync, opendirSync, rename } from "node:fs"
import path from "node:path"

import { Ffmpeg } from "../../cli-wrappers/ffmpeg.js"

async function renameFile(filePath: string) {
	const mp3Info = Ffmpeg.getMp3Info(filePath)
	if (mp3Info.artist === "" || mp3Info.title === "") {
		return false
	}

	const dirname = path.dirname(filePath)

	const newFileName = `${dirname}/${mp3Info.artist} - ${mp3Info.title}.mp3`
	if (newFileName !== filePath) {
		await rename(filePath, newFileName, () => {})
	}
}

async function renameFileManual(filePath: string) {
	const mp3Info = Ffmpeg.getMp3Info(filePath)
	if (mp3Info.artist !== "" && mp3Info.title !== "") {
		return
	}

	let artist: string = mp3Info.artist
	let title: string = mp3Info.title

	console.log(`file: ${filePath} is incomplete, please enter info manually.`)
	if (artist === "") {
		artist = await input({ message: "Enter artist: " })
	}

	if (title === "") {
		title = await input({ message: "Enter title: " })
	}

	const dirname = path.dirname(filePath)
	const newFileName = `${dirname}/${artist} - ${title}.mp3`
	if (newFileName !== filePath) {
		await rename(filePath, newFileName, () => {})
	}
}

async function renameDir(dirPath: string, interactive: boolean) {
	const dir = opendirSync(dirPath)

	let entry: Dirent | null = null
	const failedRenames: string[] = []
	do {
		entry = dir.readSync()
		if (!entry) {
			break
		}

		if (!entry.name.endsWith(".mp3") || entry.isDirectory()) {
			continue
		}

		const renameSuccess = await renameFile(path.join(dirPath, entry.name))
		if (!renameSuccess) {
			failedRenames.push(entry.name)
		}
	} while (entry !== null)

	if (!interactive) {
		return
	}

	for (const entry of failedRenames) {
		await renameFileManual(path.join(dirPath, entry))
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
			renameDir(args.input, flags.interactive)
		} else {
			renameFile(args.input)
		}
	}
}
