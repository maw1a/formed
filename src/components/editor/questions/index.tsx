import { Button } from '~/components/ui/button'
import type { IconType, Json, QuestionTypes } from './types'
import { CopyIcon, DotsVerticalIcon, TextIcon, TrashIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'

export type TabProps = Record<string, Json> & { type: QuestionTypes; question: string; idx: number }

export function Tab(question: TabProps) {
	const Icons: Record<QuestionTypes, IconType> = {
		'short-text': TextIcon
	}
	const Icon = Icons[question.type]

	return (
		<>
			<span className="flex items-center justify-between bg-blue-200 font-medium rounded-md w-12 h-6 pl-1 pr-1.5">
				<Icon width={16} height={16} />
				{question.idx + 1}
			</span>
			<div className="flex items-center flex-1 overflow-hidden text-left">
				<p className="w-full overflow-ellipsis">{question.question}</p>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" className="px-1 h-6 w-6 hover:bg-zinc-300" asChild>
						<DotsVerticalIcon width={16} height={16} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40" align="center" side="right" forceMount>
					<DropdownMenuItem className="flex items-center gap-2 text-zinc-800 cursor-pointer">
						<CopyIcon width={16} height={16} /> Duplicate
					</DropdownMenuItem>
					<DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-600 cursor-pointer">
						<TrashIcon width={16} height={16} /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
