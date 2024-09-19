'use client'

import { useFormContext } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { FormField } from '~/components/ui/form'
import { Quill } from '~/components/quill'
import { UploadIcon } from '@radix-ui/react-icons'

export function FileUploadPreview({ idx }: { idx: number }) {
	const form = useFormContext<Form>()

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
			<div className="em:mt-4 w-full">
				<div className="flex flex-col justify-center items-center em:gap-3 border border-zinc-400 border-dashed bg-zinc-100 em:px-4 em:py-20 rounded-[0.5em]">
					<UploadIcon className="em:h-16 em:w-16 text-zinc-400" />
					<div className="em:mt-2 em:text-sm text-zinc-600">
						<span className="font-semibold text-blue-600">Choose file</span> or{' '}
						<span className="font-semibold">drag here</span>
					</div>
					<div className="em:text-xs text-zinc-600">Size limit: 16MB</div>
				</div>
			</div>
		</>
	)
}
