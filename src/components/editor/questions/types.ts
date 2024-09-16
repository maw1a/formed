import type { TextIcon } from '@radix-ui/react-icons'

export type Json = string | number | object | Record<string, JSON> | Json[]

export type IconType = typeof TextIcon

export enum QuestionTypes {
	ShortText = 'short-text',
	LongText = 'long-text'
}

export type ShortText = {
	type: QuestionTypes.ShortText
	question: string
	description?: string
	placeholder?: string
}
