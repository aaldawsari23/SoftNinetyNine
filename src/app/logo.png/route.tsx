import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = {
  width: 512,
  height: 512,
};

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 30% 30%, rgba(229,9,20,0.3), transparent 55%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.12), transparent 50%), linear-gradient(135deg, #050507, #14141e)',
          fontFamily: 'Cairo, "Noto Kufi Arabic", "Segoe UI", system-ui, sans-serif',
        }}
      >
        <div
          style={{
            width: 384,
            height: 384,
            borderRadius: 48,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.35))',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            position: 'relative',
            boxShadow: '0 30px 60px rgba(0,0,0,0.35)',
          }}
        >
          <div
            style={{
              width: 224,
              height: 224,
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #ff4d5a, #e50914)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 120,
              fontWeight: 800,
              letterSpacing: -8,
              textShadow: '0 18px 30px rgba(229,9,20,0.35)',
            }}
          >
            ٩٩
          </div>

          <div
            style={{
              textAlign: 'center',
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            <div
              style={{
                fontSize: 46,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              سوفت تسعة وتسعين
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: '#cfcfd3',
                letterSpacing: 1,
              }}
            >
              Soft Ninety Nine
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
