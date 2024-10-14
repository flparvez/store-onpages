/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
const nextConfig = {
    reactStrictMode: true,
  images: {
    domains: ['i.ibb.co.com','i.ibb.co','assets.aceternity.com','dropshop.com.bd'],
  }
};
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}
export default nextConfig;
