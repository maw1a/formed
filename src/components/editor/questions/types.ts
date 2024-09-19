import type { TextIcon } from '@radix-ui/react-icons'
import type { Country } from 'react-phone-number-input'

export type Json = string | number | object | Record<string, JSON> | Json[]

export type IconType = typeof TextIcon

export enum QuestionTypes {
	ShortText = 'short-text',
	LongText = 'long-text',
	Statement = 'statement',
	Number = 'number',
	Email = 'email',
	Phone = 'phone',
	Address = 'address',
	MultipleChoice = 'multiple-choice',
	DatePicket = 'date-picker',
	OpinionScale = 'opinion-scale',
	Dropdown = 'dropdown',
	FileUpload = 'file-upload'
}

type PreviewBase<T = QuestionTypes> = {
	type: T
	question: string
	description?: string
	required?: true
}

export type Question = PreviewBase<QuestionTypes>

export type ShortText = PreviewBase<QuestionTypes.ShortText> & {
	placeholder?: string
}

export type LongText = PreviewBase<QuestionTypes.LongText> & {
	placeholder?: string
}

export type Statement = PreviewBase<QuestionTypes.Statement>

export type Number = PreviewBase<QuestionTypes.Number>

export type MultipleChoice = PreviewBase<QuestionTypes.MultipleChoice> & {
	options: Array<{ label: string; value: string }>
	multiselect: boolean
}

export type DatePicker = PreviewBase<QuestionTypes.DatePicket> & {
	format: 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy/MM/dd'
	min?: Date
	max?: Date
}

export type EmailPreview = PreviewBase<QuestionTypes.Email>

export type PhonePreview = PreviewBase<QuestionTypes.Phone> & {
	defaultCountry: Country
}

export type AddressPreview = PreviewBase<QuestionTypes.Address> & {
	required: []
}

export type OpinionScalePreview = PreviewBase<QuestionTypes.OpinionScale> & {
	start: 0 | 1
	end: 5 | 6 | 7 | 8 | 9 | 10
	fill?: true
}

export type DropdownPreview = PreviewBase<QuestionTypes.Dropdown> & {
	options: string
}

export type FileUploadPreview = PreviewBase<QuestionTypes.FileUpload>
