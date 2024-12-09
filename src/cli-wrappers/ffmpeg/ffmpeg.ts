import { spawnSync } from "node:child_process"

import { addMap, addValue } from "../../utils/spawn-utils.js"

export interface FfmpegOptions {
	codec?: string
	metadata?: {
		artist?: string
		title?: string
	}
}

export const ffmpeg = {
	spawnSync(
		input: string,
		output: string,
		{ codec = "copy", metadata }: FfmpegOptions
	) {
		const options: string[] = []

		addValue(options, input, "-i")
		addValue(options, codec, "-c")
		addMap(options, "-metadata", metadata)
		options.push(output)

		// ffmpeg -i input.mp3 -c copy -metadata artist="Someone" output.mp3
		const spawn = spawnSync("ffmpeg", options)

		return {
			error: spawn.error,
			stderr: spawn.stderr.toString("utf8"),
			stdout: spawn.stdout.toString("utf8"),
		}
	},
}
