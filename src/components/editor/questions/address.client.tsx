'use client'

import { useFormContext } from 'react-hook-form'
import type { Form } from '@prisma/client'
import { FormField } from '~/components/ui/form'
import { Quill } from '~/components/quill'

const fields: Record<string, { name: string; placeholder: string }> = {
	address_line_1: { name: 'Address', placeholder: '65 Hansen Way' },
	address_line_2: { name: 'Address line 2', placeholder: 'Apartment 4' },
	city_town: { name: 'City/Town', placeholder: 'Palo Alto' },
	state_region_province: { name: 'State/Region/Province', placeholder: 'California' },
	zip_code: { name: 'Zip/Postal code', placeholder: '94304' },
	country: { name: 'Country', placeholder: 'United States' }
}

export function AddressPreview({ idx }: { idx: number }) {
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
			<div className="flex flex-col w-full em:gap-12 em:mt-4">
				{Object.entries(fields).map(([id, { name, placeholder }]) => (
					<div key={id} className="flex w-full flex-col">
						<div className="em:text-sm text-blue-600">{name}</div>
						<input
							className="em:mt-0.5 outline-0 outline-none em:text-2xl bg-white text-zinc-400 font-normal border-b"
							placeholder={placeholder}
							disabled
						/>
					</div>
				))}
			</div>
		</>
	)
}
