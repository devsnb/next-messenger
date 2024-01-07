import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/utils/authOptions'

export default async function getSession() {
	return await getServerSession(authOptions)
}
