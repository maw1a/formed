import { notFound } from 'next/navigation'
import Editor from '~/components/editor'
import { api } from '~/trpc/server'

export default async function FormPage({ params }: { params: { id: string } }) {
	const { id } = params

	const form = await api.form.getForm({ id })

	if (!form) notFound()

	return (
		<>
			<Editor form={form} />
		</>
	)
}
