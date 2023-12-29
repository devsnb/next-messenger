'use client'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import Input from './Input'
import Button from './Button'
import AuthSocialButton from './AuthSocialButton'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER'

export default function AuthForm() {
	const router = useRouter()
	const session = useSession()
	const [variant, setVariant] = useState<Variant>('LOGIN')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		if (session?.status === 'authenticated') {
			console.log('Authenticated')
			router.push('/users')
		}
	}, [session?.status, router])

	const toggleVariant = useCallback(() => {
		if (variant === 'LOGIN') {
			setVariant('REGISTER')
		} else {
			setVariant('LOGIN')
		}
	}, [variant])

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		if (variant === 'REGISTER') {
			axios
				.post('/api/register', data)
				.then(() =>
					signIn('credentials', {
						...data,
						redirect: false
					})
				)
				.then(callback => {
					if (callback?.error) {
						toast.error('Invalid credentials!')
					}

					if (callback?.ok) {
						router.push('/conversations')
					}
				})
				.catch(() => toast.error('Something went wrong!'))
				.finally(() => setIsLoading(false))
		}

		if (variant === 'LOGIN') {
			signIn('credentials', {
				...data,
				redirect: false
			})
				.then(callback => {
					if (callback?.error) {
						toast.error('Invalid credentials!')
					}

					if (callback?.ok) {
						router.push('/conversations')
					}
				})
				.finally(() => setIsLoading(false))
		}
	}

	const socialAction = (action: 'google' | 'github') => {
		setIsLoading(true)
		signIn(action, { redirect: false })
			.then(callback => {
				if (callback?.error) {
					toast.error('Invalid Credentials')
				}

				if (callback?.ok && !callback?.error) {
					toast.success('Logged In')
				}
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
			<div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
				<form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
					{variant === 'REGISTER' && (
						<Input
							id='name'
							label='Name'
							register={register}
							errors={errors}
							disabled={isLoading}
						/>
					)}
					<Input
						id='email'
						label='Email Address'
						type='email'
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<Input
						id='password'
						label='Password'
						type='password'
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<div>
						<Button type='submit' fullWidth disabled={isLoading}>
							{variant === 'LOGIN' ? 'Sign In' : 'Register'}
						</Button>
					</div>
				</form>
				<div className='mt-6'>
					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-gray-300'></div>
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='bg-white px-2 text-gray-500'>
								Or continue with
							</span>
						</div>
					</div>
					<div className='mt-6 flex gap-2'>
						<AuthSocialButton
							icon={BsGithub}
							onClick={() => socialAction('github')}
						/>
						<AuthSocialButton
							icon={BsGoogle}
							onClick={() => socialAction('google')}
						/>
					</div>
				</div>
				<div className='flex gap-2 justify-center text-sm mt-5 px-2 text-gray-500'>
					<div>
						{variant === 'LOGIN'
							? 'New to Messenger?'
							: 'Already have an account?'}
					</div>
					<div onClick={toggleVariant} className='underline cursor-pointer'>
						{variant === 'LOGIN' ? 'Create an account' : 'Log In'}
					</div>
				</div>
			</div>
		</div>
	)
}
