'use client'

import { useFormContext } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { FormField } from '~/components/ui/form'
import { Quill } from '~/components/quill'
import { cn } from '~/lib/utils'
import { Fragment } from 'react'
import If from '~/components/If'
import { SlashIcon } from '@radix-ui/react-icons'

export function DatePickerPreview({ idx }: { idx: number }) {
	const form = useFormContext<Form>()

	return (
		<>
			<Quill
				className="*:!text-zinc-800 *:em:!text-xl font-responsive"
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
			<div className="em:mt-6 flex items-center gap-1">
				{(form.getValues(`questions.${idx}.format`) as 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy/MM/dd')
					.split('/')
					.map((f, idx) => (
						<Fragment key={f}>
							<div className="flex flex-col items-center em:gap-1.5 border-b border-black/15">
								<div className="em:text-xs text-zinc-600 font-semibold w-full em:pl-[0.5ch]">
									{{ dd: 'Day', MM: 'Month', yyyy: 'Year' }[f]}
								</div>
								<input
									disabled
									className={cn(
										'em:text-3xl em:leading-7 em:pl-0.5 outline-none bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
										f.length > 2 ? 'w-[5ch]' : 'w-[3ch]'
									)}
									type="number"
									placeholder={f.toUpperCase()}
								/>
							</div>
							<If _={idx < 2} _then={<SlashIcon className="text-zinc-400 em:h-9 em:w-9 em:mt-5 aspect-square" />} />
						</Fragment>
					))}
			</div>
		</>
	)
}
