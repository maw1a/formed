'use client'

import { useFormContext } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { FormField } from '~/components/ui/form'
import { Quill } from '~/components/quill'
import { Button } from '~/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import If from '~/components/If'

type Option = { label: string; value: string }
type Options = Array<Option>

export function MultipleChoicePreview({ idx }: { idx: number }) {
	const form = useFormContext<Form>()

	return (
		<div className="flex flex-col w-full">
			<Quill
				className="*:!text-zinc-800 *:em:!text-xl"
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
			<div className="text-zinc-400 font-normal em:mt-4 grid grid-cols-3 gap-x-6 gap-y-2">
				<FormField
					control={form.control}
					name={`questions.${idx}.options`}
					render={({ field }) => {
						const value = (field.value ?? []) as Options
						return (
							<>
								{value?.map((option: { label: string; value: string }, optionIdx: number) => (
									<div
										key={optionIdx}
										className="group relative flex items-center w-full em:space-x-2 em:mb-2 em:text-base border border-black/15 bg-background shadow-sm focus-within:border-black/40 rounded-md em:px-2.5"
									>
										<div className="em:w-6 em:h-6 em:text-sm font-semibold border border-zinc-300 rounded-sm flex items-center justify-center">
											<span>{String.fromCharCode(65 + optionIdx)}</span>
										</div>
										<input
											type="text"
											value={option.label}
											onChange={(e) => {
												const newOptions = [...value]
												if (newOptions[optionIdx]) {
													newOptions[optionIdx].label = e.target.value
													field.onChange(newOptions)
												}
											}}
											className="flex-1 rounded-sm em:text-lg outline-none w-full text-zinc-800 em:py-1"
											placeholder="choice"
										/>
										<If
											_={value.length > 1}
											_then={
												<button
													className="hidden absolute rounded-full em:text-sm bg-zinc-400 text-white em:h-5 em:w-5 group-hover:flex items-center justify-center right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
													onClick={() => {
														const newOptions = [...value]
														if (newOptions[optionIdx]) {
															newOptions.splice(optionIdx, 1)
															field.onChange(newOptions)
														}
													}}
												>
													<Cross2Icon className="em:h-4 em:w-4" />
												</button>
											}
										/>
									</div>
								))}
							</>
						)
					}}
				/>
			</div>
			<div className="flex em:mt-4">
				<Button
					variant="link"
					size="sm"
					className="em:text-lg em:h-8 em:px-3 rounded-sm text-blue-600"
					disabled={((form.getValues(`questions.${idx}.options`) ?? []) as Options).length === 9}
					onClick={() => {
						const currentOptions = (form.getValues(`questions.${idx}.options`) ?? []) as Options
						form.setValue(`questions.${idx}.options`, [
							...currentOptions,
							{ label: '', value: `option-${crypto.randomUUID()}` }
						])
					}}
				>
					Add Option
				</Button>
			</div>
		</div>
	)
}
