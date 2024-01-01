import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser()
		const body = await request.json()

		const { message, image, conversationId } = body

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 500 })
		}

		const newMessage = await prisma.message.create({
			data: {
				body: message,
				image,
				conversation: {
					connect: {
						id: conversationId
					}
				},
				sender: {
					connect: {
						id: currentUser.id
					}
				},
				seen: {
					connect: {
						id: currentUser.id
					}
				}
			},
			include: {
				seen: true,
				sender: true
			}
		})

		const updatedConversation = await prisma.conversation.update({
			where: {
				id: conversationId
			},
			data: {
				lastMessageAt: new Date(),
				messages: {
					connect: {
						id: newMessage.id
					}
				}
			},
			include: {
				users: true
			}
		})

		return NextResponse.json(newMessage)
	} catch (error) {
		console.log(error)
		return new NextResponse('InternalError', { status: 500 })
	}
}
