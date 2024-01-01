import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function DELETE(
	request: Request,
	{ params }: { params: { conversationId?: string } }
) {
	try {
		const { conversationId } = params
		const currentUser = await getCurrentUser()

		if (!currentUser?.id) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId
			},
			include: {
				users: true
			}
		})

		if (!existingConversation) {
			return new NextResponse('Invalid ID', { status: 400 })
		}

		const deletedConversation = await prisma.conversation.deleteMany({
			where: {
				id: conversationId,
				userIds: {
					hasSome: [currentUser.id]
				}
			}
		})

		return NextResponse.json(deletedConversation)
	} catch (error) {
		console.log(error)
	}
}
