import type { IconType, Json, QuestionTypes } from './types'
import {
	ArrowRightIcon,
	CopyIcon,
	DotsVerticalIcon,
	TextAlignLeftIcon,
	TextIcon,
	TrashIcon
} from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import If from '~/components/If'

import { ShortTextPreview } from './short_text.client'
import { LongTextPreview } from './long_text.client'

export type Question = Record<string, Json> & { type: QuestionTypes; question: string }

export const Icons: Record<QuestionTypes, IconType> = {
	'short-text': TextIcon,
	'long-text': TextAlignLeftIcon
}

export const Components: Record<QuestionTypes, (props: { idx: number; question: Question }) => JSX.Element> = {
	'short-text': ShortTextPreview,
	'long-text': LongTextPreview
}

export function Tab({
	question,
	idx,
	handleDelete
}: {
	question: Question
	idx: number
	handleDelete: (() => void) | false
}) {
	const Icon = Icons[question.type]

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
						_={!!handleDelete}
						_then={
							<DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-600 cursor-pointer">
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
	const Component = Components[question.type]

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
