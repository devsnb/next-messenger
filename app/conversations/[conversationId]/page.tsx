import getConversationById from '@/actions/getConversationById'
import getMessages from '@/actions/getMessages'
import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import ConversationBody from '@/components/ConversationBody'
import Form from '@/components/Form'

type Props = {
	params: { conversationId: string }
}

export default async function Conversation({ params }: Props) {
	const { conversationId } = params

	const conversation = await getConversationById(conversationId)
	const messages = await getMessages(conversationId)

	if (!conversation) {
		return (
			<div className='lg:pl-80 h-full'>
				<div className='h-full flex flex-col'>
					<EmptyState />
				</div>
			</div>
		)
	}

	return (
		<div className='lg:pl-80 h-full'>
			<div className='h-full flex flex-col'>
				<Header conversation={conversation} />
				<ConversationBody initialMessages={messages} />
				<Form />
			</div>
		</div>
	)
}
