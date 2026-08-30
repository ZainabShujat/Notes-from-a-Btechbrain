import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getObservationById } from '../../../wonder/data';

export const runtime = 'edge';

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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '60px' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#262626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '30px',
                overflow: 'hidden',
                border: '2px solid #404040'
              }}
            >
              {/* Fallback avatar visual since we can't easily fetch the actual image URL in edge without Absolute URL */}
              <div style={{ fontSize: '50px' }}>🧠</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '42px', fontWeight: 700, color: '#f5f5f5' }}>Zainab Shujat</span>
              <span style={{ fontSize: '28px', color: '#a3a3a3', marginTop: '4px' }}>@btechbrain</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <span style={{ fontSize: '48px', fontWeight: 700, color: '#f5f5f5', marginBottom: '24px' }}>
              {obs.title}
            </span>
            <span style={{ fontSize: '36px', lineHeight: 1.5, color: '#d4d4d4', whiteSpace: 'pre-wrap' }}>
              {obs.body.length > 250 ? obs.body.substring(0, 247) + '...' : obs.body}
            </span>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px' }}>
            <span style={{ fontSize: '24px', color: '#737373' }}>
              {new Date(obs.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span style={{ fontSize: '28px', fontWeight: 600, color: '#8b5cf6' }}>
              Notes From a B.Tech Brain
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
