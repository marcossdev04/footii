/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'default', // ou 'imgix' se precisar de mais controle
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Aceita qualquer hostname com HTTPS
      },
    ],
  },
}
export default nextConfig
