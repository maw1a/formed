import { useEffect, type Dispatch, type SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'
import { type Question, Tab } from './questions'
import { clamp, cn } from '~/lib/utils'

export default function Lhs({
	form,
	active,
	setActive
}: {
	form: UseFormReturn<Form>
	active: number
	setActive: Dispatch<SetStateAction<number>>
}) {
	const { watch } = form
	const questions = watch('questions')

	useEffect(() => {
		if (active > questions.length - 1) {
			setActive(0)
		}
	}, [questions, active, setActive])

	return (
		<div className="h-full w-64">
			<ResizablePanelGroup direction="vertical">
				<ResizablePanel defaultSize={60} minSize={27}>
					<div className="bg-zinc-100 rounded-xl h-full w-full">
						<div className="flex-1 overflow-y-scroll space-y-1 h-full p-3">
							{questions.map((question, idx) => (
								<button
									key={idx}
									className={cn(
										'flex items-center justify-center text-sm font-normal gap-x-2 p-2.5 w-full rounded-lg text-zinc-800 group',
										active === idx ? 'bg-zinc-200' : 'hover:bg-zinc-200/70'
									)}
									onClick={() => {
										if (active !== idx) setActive(idx)
									}}
								>
									<Tab question={question as Question} idx={idx} allowDelete={questions.length > 1} />
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
