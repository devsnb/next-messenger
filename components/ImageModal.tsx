import Image from 'next/image'
import Modal from './Modal'

type Props = {
	onClose: () => void
	src: string | null
	isOpen?: boolean
}

export default function ImageModal({ isOpen, onClose, src }: Props) {
	if (!src) {
		return <></>
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className='w-80 h-80'>
				<Image alt='image' className='object-cover' fill src={src} />
			</div>
		</Modal>
	)
}
