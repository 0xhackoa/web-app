/** @type {import('next').NextConfig} */

const nextConfig = {
  //other nextConfig options
  webpack: function (config, options) {
    //other webpack config options
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    config.resolve.fallback = {
      fs: false,
      readline: false,
    };
    return config;
  },
};


export default nextConfig;

