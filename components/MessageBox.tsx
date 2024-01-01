import { FullMessageType } from '@/types'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Avatar from './Avatar'
import { format } from 'date-fns'
import Image from 'next/image'

type Props = {
	isLast?: boolean
	data: FullMessageType
}

export default function MessageBox({ isLast, data }: Props) {
	const session = useSession()

	const isOwn = session?.data?.user?.email === data?.sender?.email

	const seenList = (data.seen || [])
		.filter(user => user.email !== data?.sender?.email)
		.map(user => user.name)
		.join(', ')

	return (
		<div className={clsx('flex gap-3 p-4', isOwn && 'justify-end')}>
			<div className={clsx(isOwn && 'order-2')}>
				<Avatar user={data.sender} />
			</div>
			<div className={clsx('flex flex-col gap-2', isOwn && 'items-end')}>
				<div className='flex items-center gap-1'>
					<div className='text-sm text-gray-500'>{data.sender.name}</div>
					<div className='text-xs'>{format(new Date(data.createdAt), 'p')}</div>
				</div>
				<div
					className={clsx(
						'text-sm w-fit overflow-hidden',
						isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
						data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
					)}
				>
					{data.image ? (
						<Image
							alt='image'
							height={255}
							width={255}
							src={data.image}
							className='object-cover cursor-pointer hover:scale-110 transition translate'
						/>
					) : (
						<div>{data.body}</div>
					)}
				</div>
				{isLast && isOwn && seenList.length > 0 && (
					<div className='text-xs font-light text-gray-500'>
						{`Seen by ${seenList}`}
					</div>
				)}
			</div>
		</div>
	)
}
