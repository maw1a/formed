import type { Form } from '@prisma/client'
import type { UseFormReturn } from 'react-hook-form'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { useState } from 'react'

export default function Rhs({ form, active }: { form: UseFormReturn<Form>; active: number }) {
	const { getValues } = form
	const formValues = getValues()

	const [tab, setTab] = useState<'content' | 'design'>('content')

	return (
		<div className="h-full w-64 bg-zinc-100 rounded-xl">
			<Tabs className="flex justify-center p-2" value={tab} onValueChange={(v) => setTab(v as 'content' | 'design')}>
				<TabsList>
					<TabsTrigger value="content">Content</TabsTrigger>
					<TabsTrigger value="design">Design</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	)
}
