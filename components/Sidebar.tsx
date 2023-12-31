import { ReactNode } from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'
import { getCurrentUser } from '@/actions/getCurrentUser'

type Props = {
	children: ReactNode
}

export default async function Sidebar({ children }: Props) {
	const currentUser = await getCurrentUser()

	return (
		<div className='h-full'>
			<DesktopSidebar currentUser={currentUser!} />
			<MobileFooter />
			<main className='lg:pl-20 h-full'>{children}</main>
		</div>
	)
}
