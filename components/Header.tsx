'use client'

import { useMemo, useState } from 'react'
import useOtherUser from '@/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import Avatar from './Avatar'
import ProfileDrawer from './ProfileDrawer'

type Props = {
	conversation: Conversation & {
		users: User[]
	}
}

export default function Header({ conversation }: Props) {
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
	const otherUser = useOtherUser(conversation)

	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`
		}

		return `Active`
	}, [conversation])

	return (
		<>
			<ProfileDrawer
				data={conversation}
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>
			<div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
				<div className='flex gap-3 items-center'>
					<Link
						href='/conversations'
						className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
					>
						<HiChevronLeft size={32} />
					</Link>
					<Avatar user={otherUser} />
					<div className='flex flex-col'>
						<div>{conversation.name || otherUser.name}</div>
						<div className='text-sm font-light text-neutral-500'>
							{statusText}
						</div>
					</div>
				</div>
				<HiEllipsisHorizontal
					size={32}
					className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
					onClick={() => setDrawerOpen(true)}
				/>
			</div>
		</>
	)
}
