'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { api } from '~/trpc/react'

export default function CreateNewFormButton() {
	const createForm = api.form.create.useMutation()
	const router = useRouter()

	const handleClick = async () => {
		try {
			const form = await createForm.mutateAsync()
			if (form) router.push(`/form/${form.id}`)
		} catch (error) {
			// Handle error (e.g., show an error message)
			console.error('Failed to create form:', error)
		}
	}

	return (
		<button onClick={handleClick} disabled={createForm.isPending}>
			{createForm.isPending ? 'Creating...' : 'Create New Form'}
		</button>
	)
}
