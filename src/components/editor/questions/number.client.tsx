'use client'

import { useFormContext } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { FormField } from '~/components/ui/form'
import { Quill } from '~/components/quill'

export function NumberPreview({ idx }: { idx: number }) {
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
			<FormField
				control={form.control}
				name={`questions.${idx}.placeholder`}
				rules={{ maxLength: 50 }}
				render={({ field }) => (
					<input
						className="outline-0 outline-none em:text-2xl text-zinc-400 font-normal em:mt-4 border-b"
						{...field}
						value={field.value?.toString() ?? ''}
						onChange={(e) => field.onChange(e.target.value)}
						maxLength={50}
					/>
				)}
			/>
		</div>
	)
}
