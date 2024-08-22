/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['m.media-amazon.com' , 'firebasestorage.googleapis.com', 'lh3.googleusercontent.com' , '127.0.0.1']
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
