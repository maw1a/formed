import { GearIcon, GlobeIcon, MobileIcon, PlayIcon, PlusIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import type { Form, Prisma } from '@prisma/client'
import type { UseFormReturn } from 'react-hook-form'
import type { QuestionTypes } from './questions/types'
import { QuestionMap, type Question, QuestionPreview, Tab } from './questions'
import { useMemo, useRef, useEffect, useState } from 'react'
import { clamp } from '~/lib/utils'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '~/components/ui/dialog'

export default function Preview({ form, active }: { form: UseFormReturn<Form>; active: number }) {
	const { getValues, setValue } = form
	const formValues = getValues()
	const [addContent, setAddContent] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)
	const question = useMemo(() => formValues.questions[active], [active, formValues.questions])

	const handleAddQuestion = (type: QuestionTypes) => {
		const newQuestions = [...getValues('questions'), QuestionMap[type].defaultValue as Prisma.JsonValue]
		setValue('questions', newQuestions)
		setAddContent(false)
	}

	useEffect(() => {
		if (!rootRef.current) return

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				if (entry.target === rootRef.current) {
					const scale = clamp(entry.contentRect.width / 1024, 0, 1)
					document.documentElement.style.setProperty('--preview-scale', scale.toString())
				}
			}
		})

		resizeObserver.observe(rootRef.current)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	return (
		<div className="flex-1 h-full flex flex-col mx-4 gap-4 pb-6" ref={rootRef}>
			<div className="bg-zinc-100 w-full px-3 py-2 rounded-xl flex items-center gap-3 text-zinc-600">
				<Dialog open={addContent} onOpenChange={setAddContent}>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm">
							<PlusIcon className="w-4 h-4 mr-1" /> Add content
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-screen-md">
						<DialogHeader>
							<DialogTitle>Add Question</DialogTitle>
							<DialogDescription>Choose a question type to add to your form.</DialogDescription>
						</DialogHeader>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
							{Object.keys(QuestionMap).map((_type) => {
								const type = _type as QuestionTypes
								const Icon = QuestionMap[type].icon
								return (
									<Button key={type} variant="ghost" size="sm" onClick={() => handleAddQuestion(type)}>
										<div className="flex items-center justify-start gap-x-2 w-full">
											<span className="mr-1">
												<Icon className="w-4 h-4" />
											</span>
											<span>{QuestionMap[type].name}</span>
										</div>
									</Button>
								)
							})}
						</div>
					</DialogContent>
				</Dialog>
				<Separator orientation="vertical" className="h-4" />
				<Button variant="ghost" size="sm" className="px-1.5">
					<MobileIcon className="w-5 h-5" />
				</Button>
				<Button variant="ghost" size="sm" className="px-1.5">
					<PlayIcon className="w-5 h-5" />
				</Button>
				<Separator orientation="vertical" className="h-4" />
				<Button variant="ghost" size="sm" className="px-1.5">
					<GlobeIcon className="w-5 h-5" />
				</Button>
				<Button variant="ghost" size="sm" className="px-1.5">
					<GearIcon className="w-5 h-5" />
				</Button>
			</div>
			<div className="flex-1 flex items-center">
				<div className="w-full max-h-full max-w-screen-lg aspect-video border border-zinc-200 rounded-sm m-auto bg-white shadow-lg shadow-zinc-500/10 flex">
					<div className="w-full h-full">
						<div className="flex items-center h-full w-full mx-auto em:max-w-3xl text-[clamp(0px,calc(var(--preview-scale)*16px),16px)]">
							<div className="w-full relative em:mt-8 em:mb-24">
								<QuestionPreview question={question as Question} idx={active} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
