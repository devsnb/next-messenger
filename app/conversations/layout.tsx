import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import ConversationList from '@/components/ConversationList'
import getConversations from '@/actions/getConversations'

type Props = {
	children: ReactNode
}

export default async function ConversationsLayout({ children }: Props) {
	const conversations = await getConversations()

	return (
		<Sidebar>
			<div className='h-full'>
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	)
}
