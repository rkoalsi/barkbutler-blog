/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "miro.medium.com",
      // S3 bucket domains for uploaded blog images
      "pupscribe-media.s3.amazonaws.com",
      "pupscribe-media.s3.ap-south-1.amazonaws.com",
      'assets.pupscribe.in',
      // Add your actual S3 bucket domain here
    ],
  },
};

module.exports = nextConfig;
