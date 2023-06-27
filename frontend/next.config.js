/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["localhost"]
  },
  env:{
    API_URL:"http://localhost:3003",
    imageUser:"http://localhost:3003/images/user-image"
  }
}

module.exports = nextConfig
