import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
	type?: 'button' | 'submit' | 'reset'
	fullWidth?: boolean
	children: ReactNode
	onClick?: () => void
	secondary?: boolean
	danger?: boolean
	disabled?: boolean
}

export default function Button({
	children,
	type = 'button',
	onClick,
	disabled,
	fullWidth,
	secondary,
	danger
}: Props): JSX.Element {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={clsx(
				`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `,
				disabled && 'opacity-50 cursor-default',
				fullWidth && 'w-full',
				secondary ? 'text-gray-900' : 'text-white',
				danger &&
					'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
				!secondary &&
					!danger &&
					'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
			)}
		>
			{children}
		</button>
	)
}
