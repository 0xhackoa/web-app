/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lottie.host',
                port: '',
            },
        ],
    }
};

export default nextConfig;
