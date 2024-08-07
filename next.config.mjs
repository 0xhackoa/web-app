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
    },
    reactStrictMode: false,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            readline: false,
        };
        return config;
    },
};

export default nextConfig;