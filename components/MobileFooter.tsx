'use client'

import useRoutes from '@/hooks/useRoutes'
import useConversation from '@/hooks/useConversation'
import MobileItem from './MobileItem'

export default function MobileFooter() {
	const routes = useRoutes()
	const { isOpen } = useConversation()

	if (isOpen) {
		return <></>
	}

	return (
		<div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
			{routes.map(route => (
				<MobileItem
					key={route.label}
					href={route.href}
					label={route.label}
					icon={route.icon}
					active={route.active}
					onClick={route.onClick}
				/>
			))}
		</div>
	)
}
