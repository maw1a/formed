import { GearIcon, GlobeIcon, MobileIcon, PlayIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import type { Form } from '@prisma/client'
import type { UseFormReturn } from 'react-hook-form'

export default function Preview({ form }: { form: UseFormReturn<Form> }) {
	const { getValues } = form
	const formValues = getValues()

	return (
		<div className="flex-1 h-full flex flex-col mx-4">
			<div className="bg-zinc-100 w-full px-3 py-2 rounded-xl flex items-center gap-3 text-zinc-600">
				<Button variant="outline" size="sm">
					+ Add content
				</Button>
				<Separator orientation="vertical" className="h-4" />
				<Button variant="ghost" size="sm" className="px-2">
					<MobileIcon width={18} height={18} />
				</Button>
				<Button variant="ghost" size="sm" className="px-2">
					<PlayIcon width={18} height={18} />
				</Button>
				<Separator orientation="vertical" className="h-4" />
				<Button variant="ghost" size="sm" className="px-2">
					<GlobeIcon width={18} height={18} />
				</Button>
				<Button variant="ghost" size="sm" className="px-2">
					<GearIcon width={18} height={18} />
				</Button>
			</div>
		</div>
	)
}
