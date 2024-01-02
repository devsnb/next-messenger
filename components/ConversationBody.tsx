'use client'

import { FullMessageType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import useConversation from '@/hooks/useConversation'
import MessageBox from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'

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

	useEffect(() => {
		pusherClient.subscribe(conversationId)
		bottomRef?.current?.scrollIntoView()

		const messageHandler = (message: FullMessageType) => {
			axios.post(`/api/conversations/${conversationId}/seen`)

			setMessages(current => {
				if (find(current, { id: message.id })) {
					return current
				}

				return [...current, message]
			})

			bottomRef?.current?.scrollIntoView()
		}

		const updateMessageHandler = (newMessage: FullMessageType) => {
			setMessages(current =>
				current.map(currentMessage => {
					if (currentMessage.id === newMessage.id) {
						return newMessage
					}

					return currentMessage
				})
			)
		}

		pusherClient.bind('messages:new', messageHandler)
		pusherClient.bind('message:update', updateMessageHandler)

		return () => {
			pusherClient.unsubscribe(conversationId)
			pusherClient.unbind('messages:new', messageHandler)
			pusherClient.unbind('message:update', updateMessageHandler)
		}
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
