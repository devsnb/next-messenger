import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

export async function POST(
	request: Request,
	{ params }: { params: { conversationId: string } }
) {
	try {
		const { conversationId } = params
		const currentUser = await getCurrentUser()

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId
			},
			include: {
				messages: {
					include: {
						seen: true
					}
				},
				users: true
			}
		})

		if (!conversation) {
			return new NextResponse('Invalid ID', { status: 400 })
		}

		const lastMessage = conversation.messages[conversation.messages.length - 1]

		if (!lastMessage) {
			return NextResponse.json(conversation)
		}

		const updatedMessage = await prisma.message.update({
			where: {
				id: lastMessage.id
			},
			include: {
				sender: true,
				seen: true
			},
			data: {
				seen: {
					connect: {
						id: currentUser.id
					}
				}
			}
		})

		return NextResponse.json(updatedMessage)
	} catch (error) {
		console.log(error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
