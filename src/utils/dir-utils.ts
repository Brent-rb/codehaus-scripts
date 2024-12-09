import { Dirent, opendirSync } from "node:fs"

export function readDirsSync(directory: string) {
	const dir = opendirSync(directory)

	const files: Dirent[] = []
	let entry = dir.readSync()
	while (entry !== null) {
		files.push(entry)
		entry = dir.readSync()
	}

	dir.closeSync()

	return files
}
