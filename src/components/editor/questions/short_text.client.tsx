'use client'

import type { ShortText } from './types'

export function ShortTextPreview(props: ShortText & { idx: number }) {
	return (
		<div className="flex flex-col w-full">
			<p className="text-lg text-zinc-800">{props.question}</p>
			<p className="text-sm text-zinc-600 font-light mt-2">{props.description}</p>
			<p className="text-base underline text-zinc-300 mt-6">{props.placeholder}</p>
		</div>
	)
}
