import React from 'react'
import { redirect } from 'next/navigation'
import { getServerAuthSession } from '~/server/auth'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerAuthSession()

	if (!session) redirect('/')

	return <div className="flex h-screen flex-col">{children}</div>
}
