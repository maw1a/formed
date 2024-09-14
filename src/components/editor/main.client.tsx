'use client'

import type { Form } from '@prisma/client'
import type { Session } from 'next-auth'
import { useForm } from 'react-hook-form'
import Header from './header.client'
import Lhs from './lhs.client'
import Preview from './preview.client'
import Rhs from './rhs.client'

export default function Main({ session, form: defaultForm }: { session: Session; form: Form }) {
	const form = useForm<Form>({ defaultValues: defaultForm })

	return (
		<>
			<Header session={session} form={form} />
			<main className="flex-1 flex">
				<Lhs form={form} />
				<Preview form={form} />
				<Rhs form={form} />
			</main>
		</>
	)
}
