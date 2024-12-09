export function addBoolean(options: string[], value: boolean, flag: string) {
	if (value) {
		options.push(flag)
	}
}

export function addValue(options: string[], value: unknown, flag: string) {
	if (value !== undefined) {
		options.push(flag, `${value}`)
	}
}

export function addMap(
	options: string[],
	flag: string,
	map?: { [key: string]: string }
) {
	if (!map) {
		return
	}

	for (const key of Object.keys(map)) {
		const value = map[key]
		if (value === undefined) {
			continue
		}

		options.push(flag, `${key}=${map[key]}`)
	}
}
