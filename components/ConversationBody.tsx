'use client'

import { FullMessageType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import useConversation from '@/hooks/useConversation'
import MessageBox from './MessageBox'
import axios from 'axios'

type Props = {
	initialMessages: FullMessageType[]
}

export default function ConversationBody({ initialMessages }: Props) {
	const [messages, setMessages] = useState<FullMessageType[]>(initialMessages)
	const bottomRef = useRef<HTMLDivElement>(null)

	const { conversationId } = useConversation()

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`)
	}, [conversationId])

	return (
		<div className='flex-1 overflow-y-auto'>
			{messages.map((message, idx) => (
				<MessageBox
					isLast={idx === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}
			<div ref={bottomRef}></div>
		</div>
	)
}
