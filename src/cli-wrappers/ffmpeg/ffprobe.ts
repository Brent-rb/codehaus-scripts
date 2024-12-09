import { spawnSync } from "node:child_process"

import { addBoolean, addValue } from "../../utils/spawn-utils.js"

export interface FfprobeOptions {
	hideBanner?: boolean
	outputFormat?: "csv" | "default" | "flat" | "ini" | "json" | "xml"
	showEntries?: string
	verboseLevel?: number
}

export const ffprobe = {
	spawnSync(
		input: string,
		{
			hideBanner = false,
			outputFormat = "json",
			showEntries,
			verboseLevel = 0,
		}: FfprobeOptions
	) {
		const options: string[] = []

		addBoolean(options, hideBanner, "-hide_banner")
		addValue(options, verboseLevel, "-v")
		addValue(options, input, "-i")
		addValue(options, showEntries, "-show_entries")
		addValue(options, outputFormat, "-of")

		const spawn = spawnSync("ffprobe", options)

		return {
			error: spawn.error,
			stderr: spawn.stderr.toString("utf8"),
			stdout: spawn.stdout.toString("utf8"),
		}
	},
}
