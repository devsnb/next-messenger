import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import getUsers from '@/actions/getUsers'
import UserList from '@/components/UserList'

type Props = {
	children: ReactNode
}

export default async function UserLayout({ children }: Props) {
	const users = await getUsers()
	return (
		<Sidebar>
			<div className='h-full'>
				<UserList items={users} />
				{children}
			</div>
		</Sidebar>
	)
}
