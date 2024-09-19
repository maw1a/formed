import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

export function extractText(s: string) {
	const div = document.createElement('div')
	div.innerHTML = s
	const paragraphs = div.getElementsByTagName('p')
	let text = ''
	for (const p of paragraphs) {
		text += p.textContent + '\n'
	}
	return text.trim()
}
