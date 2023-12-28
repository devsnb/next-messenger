'use client'

import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
	label: string
	id: string
	type?: string
	required?: boolean
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	disabled?: boolean
}

export default function Input({
	label,
	id,
	type,
	required,
	register,
	errors,
	disabled
}: Props) {
	return (
		<div>
			<label
				className='block text-sm font-medium leading-6 text-gray-900'
				htmlFor={id}
			>
				{label}
			</label>
			<div className='mt-2'>
				<input
					type={type}
					id={id}
					autoComplete={id}
					disabled={disabled}
					{...register(id, { required })}
					className={clsx(
						`form-input block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6`,
						errors['id'] && 'focus: ring-rose-500',
						disabled && 'opacity-50 cursor-default'
					)}
				/>
			</div>
		</div>
	)
}
