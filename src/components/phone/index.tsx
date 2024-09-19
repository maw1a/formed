import type { ComponentProps } from 'react'
import PhoneNumberInput from 'react-phone-number-input'
import { cn } from '~/lib/utils'

import './styles.css'

export function PhoneInput(props: ComponentProps<typeof PhoneNumberInput>) {
	return (
		<PhoneNumberInput
			defaultCountry="US"
			{...props}
			className={cn('PhoneInput-overwrite', props.className)}
			smartCaret
		/>
	)
}
