import type { Form } from '@prisma/client'
import type { UseFormReturn } from 'react-hook-form'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import { Tab, TabProps } from './questions'
import { Fragment, useState } from 'react'
import { cn } from '~/lib/utils'

export default function Lhs({ form }: { form: UseFormReturn<Form> }) {
	const { getValues } = form
	const formValues = getValues()
	const [active, setActive] = useState(0)

	return (
		<div className="h-full w-64">
			<ResizablePanelGroup direction="vertical">
				<ResizablePanel defaultSize={60} minSize={27}>
					<div className="bg-zinc-100 rounded-xl p-3 h-full w-full">
						<div className="flex-1 overflow-hidden">
							{formValues.questions.map((question, idx) => (
								<button
									className={cn(
										'flex items-center justify-center text-sm font-normal gap-x-2 p-2.5 w-full rounded-lg text-zinc-800 group',
										active === idx ? 'bg-zinc-200' : 'hover:bg-zinc-200/70'
									)}
									key={idx}
								>
									<Tab {...(question as TabProps)} idx={idx} />
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
