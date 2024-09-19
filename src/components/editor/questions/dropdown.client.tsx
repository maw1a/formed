'use client'

import { useFormContext } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { FormField } from '~/components/ui/form'
import { Quill } from '~/components/quill'
import { useEffect, useMemo, useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { extractText } from '~/lib/utils'

export function DropdownPreview({ idx }: { idx: number }) {
	const form = useFormContext<Form>()

	const options = form.watch(`questions.${idx}.options`) as string
	const optionsListLength = useMemo(
		() =>
			extractText(options)
				.split('\n')
				.filter((o) => o.trim().length > 0).length,
		[options]
	)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [optionDlg, setOptionDlg] = useState<{ open: boolean; defaultValue: any }>({ open: false, defaultValue: null })

	useEffect(() => console.log(optionsListLength), [optionsListLength])

	return (
		<>
			<Quill
				className="font-responsive *:!text-zinc-800 *:em:!text-xl"
				name={`questions.${idx}.question`}
				form={form}
				placeholder="Your question here."
			/>
			<FormField
				control={form.control}
				name={`questions.${idx}.description`}
				rules={{ maxLength: 70 }}
				render={({ field }) => (
					<input
						className="outline-0 outline-none em:text-lg text-zinc-600 font-normal em:mt-1 placeholder:italic placeholder:text-zinc-400"
						placeholder="Description (optional)"
						{...field}
						value={field.value?.toString() ?? ''}
						onChange={(e) => field.onChange(e.target.value)}
						maxLength={70}
					/>
				)}
			/>
			<div className="em:mt-8 w-full">
				<Dialog
					open={optionDlg.open}
					onOpenChange={(v) =>
						setOptionDlg({ open: v, defaultValue: v ? form.getValues(`questions.${idx}.options`) ?? null : null })
					}
				>
					<DialogTrigger asChild>
						<button className="w-full !ring-0 !shadow-none rounded-none border-0 border-b border-b-zinc-300 whitespace-nowrap bg-transparent ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
							<div className="flex justify-between items-center em:text-2xl em:px-0.5 em:py-2 em:h-9 text-zinc-400">
								<span>Select an option</span>
								<ChevronDownIcon className="em:h-4 em:w-4 opacity-50" />
							</div>
						</button>
					</DialogTrigger>
					<DialogContent className="max-w-screen-sm">
						<DialogHeader>
							<DialogTitle>Add choices</DialogTitle>
							<DialogDescription>
								Write or paste your choices below. Each choice must be on a separate line.
							</DialogDescription>
						</DialogHeader>
						<div className="w-full max-h-80 min-h-48">
							<Quill
								name={`questions.${idx}.options`}
								form={form}
								className="px-3 py-2 h-full !text-xl leading-tight rounded-lg border border-zinc-300"
								placeholder={`Your choices go here\nOne per line\nLike this\n:)`}
							/>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button size="sm" variant="ghost">
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<div className="flex em:mt-4 justify-between items-center">
					<Button
						variant="link"
						size="sm"
						className="em:text-lg em:h-8 em:px-3 rounded-sm text-blue-600"
						onClick={() => {
							setOptionDlg({ open: true, defaultValue: form.getValues(`questions.${idx}.options`) })
						}}
					>
						Add choices
					</Button>
					<div className="text-blue-600">{optionsListLength} choices in the list</div>
				</div>
			</div>
		</>
	)
}
