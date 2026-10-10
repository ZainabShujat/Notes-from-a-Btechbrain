import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getObservationById } from '../../../wonder/data';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new ImageResponse(
        (
          <div style={{ display: 'flex', width: '100%', height: '100%', background: '#111', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
            Wonder
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    const obs = getObservationById(id);

    if (!obs) {
      return new ImageResponse(
        (
          <div style={{ display: 'flex', width: '100%', height: '100%', background: '#111', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
            Not Found
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    const [year, month, day] = obs.date.split('-').map(Number);
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const bodyText = obs.body.length > 320 ? obs.body.substring(0, 317) + '...' : obs.body;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0a0a0a',
            color: '#e5e5e5',
            padding: '80px',
            fontFamily: 'system-ui, sans-serif',
            borderTop: '16px solid #8b5cf6', // Violet accent
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
            <div
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                backgroundColor: '#262626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '24px',
                overflow: 'hidden',
                border: '2px solid #404040'
              }}
            >
              <div style={{ fontSize: '46px' }}>🧠</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '38px', fontWeight: 700, color: '#f5f5f5' }}>Zainab Shujat</span>
              <span style={{ fontSize: '26px', color: '#a3a3a3', marginTop: '2px' }}>@btechbrain</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
            <span style={{ fontSize: '44px', fontWeight: 700, color: '#f5f5f5', marginBottom: '20px', lineHeight: 1.25 }}>
              {obs.title}
            </span>
            <span style={{ fontSize: '32px', lineHeight: 1.5, color: '#d4d4d4', whiteSpace: 'pre-wrap' }}>
              {bodyText}
            </span>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '36px' }}>
            <span style={{ fontSize: '24px', color: '#737373' }}>
              {formattedDate}
            </span>
            <span style={{ fontSize: '26px', fontWeight: 600, color: '#a78bfa' }}>
              Notes From a B.Tech Brain · Wonder
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
