/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [['next-superjson-plugin', {}]]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			}
		]
	}
}

module.exports = nextConfig
