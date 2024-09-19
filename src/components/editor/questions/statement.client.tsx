'use client'

import { useFormContext } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { FormField } from '~/components/ui/form'
import { Quill } from '~/components/quill'
import { Button } from '~/components/ui/button'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

export function StatementPreview({ idx }: { idx: number }) {
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
			<div className="flex em:gap-4 em:mt-4">
				<Button variant="outline" size="sm" className="em:text-sm em:h-8 em:px-3 rounded-sm">
					<div className="flex items-center justify-center em:gap-1">
						<CheckIcon className="em:w-5 em:h-5" /> Yes
					</div>
				</Button>
				<Button variant="outline" size="sm" className="em:text-sm em:h-8 em:px-3 rounded-sm">
					<div className="flex items-center justify-center em:gap-1">
						<Cross2Icon className="em:w-5 em:h-5" /> No
					</div>
				</Button>
			</div>
		</>
	)
}
