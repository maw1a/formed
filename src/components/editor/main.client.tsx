'use client'

import type { Form as TForm } from '@prisma/client'
import type { Session } from 'next-auth'
import { useForm } from 'react-hook-form'
import Header from './header.client'
import Lhs from './lhs.client'
import Preview from './preview.client'
import Rhs from './rhs.client'
import { useState } from 'react'
import { Form } from '../ui/form'

export default function Main({ session, form: defaultForm }: { session: Session; form: TForm }) {
	const form = useForm<TForm>({ defaultValues: defaultForm })
	const [active, setActive] = useState(0)

	function onSubmit(values: TForm) {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form className="flex h-full w-screen flex-col overflow-hidden px-4 pb-4" onSubmit={form.handleSubmit(onSubmit)}>
				<Header session={session} form={form} />
				<main className="flex-1 flex">
					<Lhs form={form} active={active} setActive={setActive} />
					<Preview form={form} active={active} />
					<Rhs form={form} active={active} />
				</main>
			</form>
		</Form>
	)
}
