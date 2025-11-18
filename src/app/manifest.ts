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
        src: '/logo.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any'
      },
      {
        src: '/logo.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'maskable'
      }
    ],
    categories: ['shopping', 'automotive'],
    screenshots: [
      {
        src: '/logo.jpeg',
        sizes: '1280x720',
        type: 'image/jpeg',
        form_factor: 'wide'
      }
    ]
  }
}