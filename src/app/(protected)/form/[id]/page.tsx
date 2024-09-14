import Editor from '~/components/editor'
import { api } from '~/trpc/server'

export default async function FormPage({ params }: { params: { id: string } }) {
	const { id } = params

	const form = await api.form.getForm({ id })

	if (!form) throw new Error('Not Found')

	return (
		<div className="flex h-full w-screen flex-col overflow-hidden px-4 pb-4">
			<Editor form={form} />
		</div>
	)
}
