import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('session_id')?.value || 'anonymous';
    const { searchParams } = new URL(request.url);
    const post_id = searchParams.get('post_id');
    if (!post_id) return NextResponse.json({ error: 'post_id required' }, { status: 400 });

    const { data } = await supabase
      .from('reader_history')
      .select('id, progress, last_read_at')
      .eq('post_id', post_id)
      .eq('session_id', sessionId)
      .order('last_read_at', { ascending: false })
      .limit(1)
      .single();

    return NextResponse.json({ read: !!data, progress: data?.progress || 0, last_read_at: data?.last_read_at || null });
  } catch (error) {
    return NextResponse.json({ read: false, progress: 0, last_read_at: null }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('session_id')?.value || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const body = await request.json().catch(() => ({}));
    const { post_id, post_title = null, progress = 100 } = body;
    if (!post_id) return NextResponse.json({ error: 'post_id required' }, { status: 400 });

    await supabase
      .from('reader_history')
      .upsert({
        session_id: sessionId,
        post_id,
        post_slug: slug,
        post_title,
        progress,
        last_read_at: new Date().toISOString(),
      }, { onConflict: 'session_id,post_id' });

    const response = NextResponse.json({ success: true });
    response.cookies.set('session_id', sessionId, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: 'lax',
    });
    return response;
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
