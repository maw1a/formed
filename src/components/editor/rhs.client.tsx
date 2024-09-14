import type { Form } from '@prisma/client'
import type { UseFormReturn } from 'react-hook-form'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

export default function Rhs({ form }: { form: UseFormReturn<Form> }) {
	const { getValues } = form
	const formValues = getValues()

	return (
		<div className="h-full w-64 bg-zinc-100 rounded-xl">
			<Tabs className="flex justify-center p-2">
				<TabsList defaultValue="content">
					<TabsTrigger value="content">Content</TabsTrigger>
					<TabsTrigger value="design">Design</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	)
}
