import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { FullConversationType } from '@/types'
import { User } from '@prisma/client'

type Conversation = FullConversationType | {
	users: User[]
}

export default function useOtherUser(conversation: Conversation) {
	const session = useSession()

	const otherUser = useMemo(() => {
		const currentUserEmail = session?.data?.user?.email

		const otherUser = conversation.users.filter(
			user => user.email !== currentUserEmail
		)

		return otherUser[0]
	}, [session?.data?.user?.email, conversation.users])

	return otherUser
}
