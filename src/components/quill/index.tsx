'use client'

import { useEffect } from 'react'
import type { Path, UseFormReturn } from 'react-hook-form'
import ReactQuill, { type ReactQuillProps, type Value } from 'react-quill'

import './styles.css'
import { cn } from '~/lib/utils'

export function Quill<T extends Record<string, unknown>>({
	name,
	form,
	...props
}: ReactQuillProps & { name: string; form: UseFormReturn<T> }) {
	useEffect(() => {
		form.register(name as Path<T>, { required: true, minLength: 11 })
	}, [form, name])
	const onEditorStateChange = (editorState: string) => {
		form.setValue(name as Path<T>, editorState as never)
	}

	const editorContent = form.watch(name as Path<T>)

	return (
		<ReactQuill
			{...props}
			className={cn('quill-overwrite', props.className)}
			theme="bubble"
			modules={{ ...props.modules, toolbar: [['bold', 'italic', 'underline']] }}
			formats={['bold', 'italic', 'underline', ...(props.formats ?? [])]}
			value={editorContent as Value}
			onChange={onEditorStateChange}
		/>
	)
}
