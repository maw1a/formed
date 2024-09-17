import type { TextIcon } from '@radix-ui/react-icons'

export type Json = string | number | object | Record<string, JSON> | Json[]

export type IconType = typeof TextIcon

export enum QuestionTypes {
	ShortText = 'short-text',
	LongText = 'long-text',
	Statement = 'statement',
	Number = 'number',
	MultipleChoice = 'multiple-choice',
	DatePicket = 'date-picker'
}

export type ShortText = {
	type: QuestionTypes.ShortText
	question: string
	description?: string
	placeholder?: string
}

export type LongText = {
	type: QuestionTypes.LongText
	question: string
	description?: string
	placeholder?: string
}

export type Statement = {
	type: QuestionTypes.Statement
	question: string
	description?: string
}

export type Number = {
	type: QuestionTypes.Number
	question: string
	description?: string
}

export type MultipleChoice = {
	type: QuestionTypes.MultipleChoice
	question: string
	description?: string
	options: Array<{ label: string; value: string }>
	multiselect: boolean
}

export type DatePicker = {
	type: QuestionTypes.DatePicket
	question: string
	description?: string
	format: 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy/MM/dd'
	min?: Date
	max?: Date
}
