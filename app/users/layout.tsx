import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'

type Props = {
	children: ReactNode
}

export default async function UserLayout({ children }: Props) {
	return (
		<div className='h-full'>
			<Sidebar>{children}</Sidebar>
		</div>
	)
}
