import type { TextIcon } from '@radix-ui/react-icons'

export type Json = string | number | object | Json[]

export type IconType = typeof TextIcon

export enum QuestionTypes {
	ShortText = 'short-text'
}

export type ShortText = {
	type: QuestionTypes.ShortText
	question: string
	description?: string
	placeholder?: string
}
