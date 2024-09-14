import type { Form } from '@prisma/client'
import { getServerAuthSession } from '~/server/auth'
import Main from './main.client'

export default async function Editor({ form }: { form: Form }) {
	const session = await getServerAuthSession()

	return (
		<>
			<Main form={form} session={session!} />
		</>
	)
}
