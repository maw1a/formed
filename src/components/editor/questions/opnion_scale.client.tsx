'use client'

import { useFormContext } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { FormField } from '~/components/ui/form'
import { Quill } from '~/components/quill'
import { Button } from '~/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import If from '~/components/If'

export function OpinionScalePreview({ idx }: { idx: number }) {
	const form = useFormContext<Form>()
	const start = form.watch(`questions.${idx}.start`) as number
	const end = form.watch(`questions.${idx}.end`) as number

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
			<div className="text-zinc-400 font-normal em:mt-8 flex gap-2">
				{Array.from({ length: end - start + 1 }, (_, index) => (
					<button
						key={index}
						disabled
						className="flex items-center justify-center flex-1 em:h-14 border border-zinc-300 bg-zinc-100 em:rounded-[0.25em]"
					>
						<span className="em:text-xl text-zinc-500">{index + start}</span>
					</button>
				))}
			</div>
		</>
	)
}
