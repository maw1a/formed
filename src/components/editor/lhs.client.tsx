import type { Form } from '@prisma/client'
import type { UseFormReturn } from 'react-hook-form'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'
import { type Question, Tab } from './questions'
import { useCallback, type Dispatch, type SetStateAction } from 'react'
import { cn } from '~/lib/utils'

export default function Lhs({
	form,
	active,
	setActive
}: {
	form: UseFormReturn<Form>
	active: number
	setActive: Dispatch<SetStateAction<number>>
}) {
	const { getValues, setValue } = form
	const formValues = getValues()

	const handleDelete = useCallback(
		(idx: number) => {
			if (formValues.questions.length === 1) return false

			return () => {
				const q = formValues.questions.slice()
				q.splice(idx, 1)
				setValue('questions', q)
			}
		},
		[formValues.questions, setValue]
	)

	return (
		<div className="h-full w-64">
			<ResizablePanelGroup direction="vertical">
				<ResizablePanel defaultSize={60} minSize={27}>
					<div className="bg-zinc-100 rounded-xl p-3 h-full w-full">
						<div className="flex-1 overflow-hidden">
							{formValues.questions.map((question, idx) => (
								<button
									key={idx}
									className={cn(
										'flex items-center justify-center text-sm font-normal gap-x-2 p-2.5 w-full rounded-lg text-zinc-800 group',
										active === idx ? 'bg-zinc-200' : 'hover:bg-zinc-200/70'
									)}
									onClick={() => {
										if (active !== idx) setActive(idx)
										else console.log('is active:', idx)
									}}
								>
									<Tab question={question as Question} idx={idx} handleDelete={handleDelete(idx)} />
								</button>
							))}
						</div>
					</div>
				</ResizablePanel>
				<ResizableHandle className="my-2.5" withHandle />
				<ResizablePanel minSize={16}>
					<div className="bg-zinc-100 rounded-xl p3 h-full w-full"></div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}
