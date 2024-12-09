import { spawnSync } from "node:child_process"

export interface Mp3Info {
	artist: string
	title: string
}

export interface FfprobeOptions {
	hideBanner?: boolean
	outputFormat?: "csv" | "default" | "flat" | "ini" | "json" | "xml"
	showEntries?: string
	verboseLevel?: number
}

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

function addBoolean(options: string[], value: boolean, flag: string) {
	if (value) {
		options.push(flag)
	}
}

function addValue(options: string[], value: unknown, flag: string) {
	if (value !== undefined) {
		options.push(flag, `${value}`)
	}
}

export const Ffprobe = {
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

export const Ffmpeg = {
	getMp3Info(file: string): Mp3Info {
		const ffprobe = Ffprobe.spawnSync(file, {
			hideBanner: true,
			showEntries: "format",
		})

		if (ffprobe.error) {
			throw new Error(ffprobe.stderr)
		}

		const rawOutput = JSON.parse(ffprobe.stdout) as RawMp3Output

		return {
			artist: rawOutput.format?.tags?.artist?.trim() ?? "",
			title: rawOutput.format?.tags?.title?.trim() ?? "",
		}
	},
}
