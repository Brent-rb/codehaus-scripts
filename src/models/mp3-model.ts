import { rename, renameSync, unlinkSync } from "node:fs"
import path from "node:path"

import { ffmpeg } from "../cli-wrappers/ffmpeg/ffmpeg.js"
import { ffprobe } from "../cli-wrappers/ffmpeg/ffprobe.js"
import { CommandError } from "../errors/command-error.js"
import { readDirsSync } from "../utils/dir-utils.js"
import { Result } from "./result.js"

export interface RawMp3Output {
	format?: {
		bit_rate: string // number
		duration: string // number
		filename: string
		format_long_name: string
		format_name: string
		nb_programs: number
		nb_stream_groups: number
		nb_streams: number
		probe_score: number
		size: string // number
		start_time: string // number
		tags?: {
			[key: string]: string | undefined
			TYER?: string
			artist?: string
			disc?: string
			title?: string
			track?: string
		}
	}
}

export interface Mp3Output {
	bitRate: number
	duration: number
	filename: string
	formatLongName: string
	formatName: string
	size: number
	startTime: number
	tags: {
		artist: string
		title: string
	}
}

function toMp3Output(rawOutput: RawMp3Output): Mp3Output {
	return {
		bitRate: Number.parseFloat(rawOutput.format?.bit_rate ?? "0"),
		duration: Number.parseFloat(rawOutput.format?.duration ?? "0"),
		filename: rawOutput.format?.filename ?? "",
		formatLongName: rawOutput.format?.format_long_name ?? "",
		formatName: rawOutput.format?.format_name ?? "",
		size: Number.parseInt(rawOutput.format?.size ?? "0", 10),
		startTime: Number.parseFloat(rawOutput.format?.start_time ?? "0"),
		tags: {
			artist: rawOutput.format?.tags?.artist ?? "",
			title: rawOutput.format?.tags?.title ?? "",
		},
	}
}

export const Mp3Model = {
	async dirRenameFromTags(
		directory: string
	): Promise<Map<string, Result<boolean>>> {
		const renameResults = new Map<string, Result<boolean>>()

		const files = readDirsSync(directory).filter(
			(file) => file.name.endsWith(".mp3") && file.isFile()
		)

		await Promise.all(
			files.map(async (file) => {
				const result = await Mp3Model.fileRenameFromTags(
					path.join(directory, file.name)
				)
				renameResults.set(file.name, result)
				if (result.data) {
					console.log(`file ${file.name} renamed`)
				} else {
					console.log(`file ${file.name} error ${result.error}`)
				}
			})
		)

		const values = [...renameResults.values()]
		const success = values.filter((it) => it.data === true)
		const failed = values.filter((it) => it.data === false)
		const error = values.filter((it) => it.error !== undefined)

		console.log(
			`Renamed ${success.length} of ${files.length}, ${failed.length} failed, ${error.length} resulted in error`
		)

		return renameResults
	},

	async fileRename(
		oldFile: string,
		artist: string,
		title: string,
		extension: string = "mp3"
	) {
		const dirname = path.dirname(oldFile)
		const newFileName = `${dirname}/${artist} - ${title}.${extension}`
		if (newFileName !== oldFile) {
			await rename(oldFile, newFileName, () => {})
		}
	},

	async fileRenameFromTags(file: string): Promise<Result<boolean>> {
		const output = Mp3Model.getMp3Info(file)
		if (output.hasError()) {
			return new Result(false)
		}

		const { tags } = output.unwrap()
		if (tags.artist === "" || tags.title === "") {
			return new Result(false)
		}

		await Mp3Model.fileRename(file, tags.artist, tags.title, "mp3")
		return new Result(true)
	},

	getMp3Info(file: string): Result<Mp3Output> {
		const output = ffprobe.spawnSync(file, {
			hideBanner: true,
			showEntries: "format",
		})

		if (output.error) {
			return new Result<Mp3Output>(
				undefined,
				new CommandError("ffprobe", output.stderr)
			)
		}

		const rawOutput = JSON.parse(output.stdout) as RawMp3Output
		return new Result(toMp3Output(rawOutput))
	},

	async setTags(file: string, artist: string, title: string) {
		const extension = path.extname(file)
		const tempPath = `${file.replace(extension, "")}.tmp${extension}`

		const output = ffmpeg.spawnSync(file, tempPath, {
			codec: "copy",
			metadata: {
				artist,
				title,
			},
		})

		if (output.error) {
			return new Result<boolean>(
				undefined,
				new CommandError("ffmpeg", output.stderr)
			)
		}

		unlinkSync(file)
		renameSync(tempPath, file)

		return new Result(true)
	},
}
