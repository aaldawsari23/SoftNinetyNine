import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'سوفت تسعة وتسعين - قطع غيار الدراجات النارية',
    short_name: 'سوفت99',
    description: 'متجر متخصص في قطع الغيار الأصلية وزيوت الصيانة للدراجات النارية في جيزان',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0F',
    theme_color: '#E50914',
    orientation: 'portrait',
    scope: '/',
    lang: 'ar',
    dir: 'rtl',
    icons: [
      {
        src: '/Logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/Logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['shopping', 'automotive'],
    screenshots: [
      {
        src: '/logo.svg',
        sizes: '1280x720',
        type: 'image/svg+xml',
        form_factor: 'wide'
      }
    ]
  }
}