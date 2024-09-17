import type * as EditorQuestionTypes from './types'
import type { Form } from '@prisma/client'
import {
	ArrowRightIcon,
	CalendarIcon,
	ComponentBooleanIcon,
	CopyIcon,
	DotsVerticalIcon,
	FrameIcon,
	ListBulletIcon,
	TextAlignLeftIcon,
	TextIcon,
	TrashIcon
} from '@radix-ui/react-icons'
import { useFormContext } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import If from '~/components/If'

import { ShortTextPreview } from './short_text.client'
import { LongTextPreview } from './long_text.client'
import { StatementPreview } from './statement.client'
import { NumberPreview } from './number.client'
import { MultipleChoicePreview } from './multiple_choice.client'
import { DatePickerPreview } from './date_picker.client'

export type Question = Record<string, EditorQuestionTypes.Json> & {
	type: EditorQuestionTypes.QuestionTypes
	question: string
}

export const QuestionMap: Record<
	EditorQuestionTypes.QuestionTypes,
	{
		icon: EditorQuestionTypes.IconType
		preview: (props: { idx: number; question: Question }) => JSX.Element
		name: string
		defaultValue: { type: EditorQuestionTypes.QuestionTypes; [k: string]: unknown }
	}
> = {
	'short-text': {
		name: 'Short Text',
		icon: TextIcon,
		preview: ShortTextPreview,
		defaultValue: {
			type: 'short-text',
			question: '...',
			placeholder: 'Type your answer here...'
		} as EditorQuestionTypes.ShortText
	},
	'long-text': {
		name: 'Long Text',
		icon: TextAlignLeftIcon,
		preview: LongTextPreview,
		defaultValue: {
			type: 'long-text',
			question: '...',
			placeholder: 'Type your answer here...'
		} as EditorQuestionTypes.LongText
	},
	statement: {
		name: 'Statement',
		icon: ComponentBooleanIcon,
		preview: StatementPreview,
		defaultValue: { type: 'statement', question: '...' } as EditorQuestionTypes.Statement
	},
	number: {
		name: 'Number',
		icon: FrameIcon,
		preview: NumberPreview,
		defaultValue: {
			type: 'number',
			question: '...',
			placeholder: 'Type your answer here...',
			min: 0,
			max: 99999
		} as EditorQuestionTypes.Number
	},
	'multiple-choice': {
		name: 'Multiple Choice',
		icon: ListBulletIcon,
		preview: MultipleChoicePreview,
		defaultValue: {
			type: 'multiple-choice',
			question: '...',
			options: [{ label: '', value: `option-1` }],
			multiselect: false
		} as EditorQuestionTypes.MultipleChoice
	},
	'date-picker': {
		name: 'Date Picker',
		icon: CalendarIcon,
		preview: DatePickerPreview,
		defaultValue: { type: 'date-picker', question: '...', format: 'dd/MM/yyyy' } as EditorQuestionTypes.DatePicker
	}
}

export function Tab({ question, idx, allowDelete }: { question: Question; idx: number; allowDelete: boolean }) {
	const Icon = QuestionMap[question.type].icon

	const { setValue, getValues } = useFormContext<Form>()

	const handleDelete = () => {
		if (!allowDelete) return

		const q = getValues('questions').slice()
		q.splice(idx, 1)
		setValue('questions', q)
	}

	return (
		<>
			<span className="flex items-center justify-between bg-blue-200 font-medium rounded-md w-12 h-6 pl-1 pr-1.5">
				<Icon className="w-4 h-4" />
				{idx + 1}
			</span>
			<div className="flex items-center flex-1 overflow-hidden text-left">
				<div className="w-full truncate line-clamp-1" dangerouslySetInnerHTML={{ __html: question.question }} />
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger className="invisible group-hover:visible" asChild>
					<Button variant="ghost" size="sm" className="px-1 h-6 w-6 hover:bg-zinc-300" asChild>
						<DotsVerticalIcon className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40" align="center" side="right" forceMount>
					<DropdownMenuItem className="flex items-center gap-2 text-zinc-800 cursor-pointer">
						<CopyIcon className="w-4 h-4" /> Duplicate
					</DropdownMenuItem>
					<If
						_={allowDelete}
						_then={
							<DropdownMenuItem
								className="flex items-center gap-2 text-red-500 focus:text-red-600 cursor-pointer"
								onClick={handleDelete}
							>
								<TrashIcon className="w-4 h-4" /> Delete
							</DropdownMenuItem>
						}
					/>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export function QuestionPreview({ question, idx }: { question: Question; idx: number }) {
	if (!question) return null

	const Component = QuestionMap[question.type].preview

	return (
		<>
			<div className="absolute left-0 top-0 text-blue-700 -translate-x-full em:h-9 em:pb-0.5 flex items-center">
				<span className="em:text-base">{idx + 1}</span>
				<ArrowRightIcon className="em:h-5 em:w-5 em:ml-1 em:mr-2" />
			</div>
			<Component question={question} idx={idx} />
		</>
	)
}
