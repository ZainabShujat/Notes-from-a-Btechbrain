import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { cookies } from 'next/headers';
import { getAllPosts } from '../../../../lib/posts';

export async function GET() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('session_id')?.value || 'anonymous';

  const { data, error } = await supabase
    .from('reader_history')
    .select('*')
    .eq('session_id', sessionId)
    .order('last_read_at', { ascending: false })
    .limit(3);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Enrich with post title and banner
  const posts = await getAllPosts();
  const history = (data || []).map((entry) => {
    // Try to find the post by slug or id
    const post = posts.find((p: any) => p.slug === entry.post_slug || p.slug === entry.post_id || p.slug === entry.slug);
    return {
      ...entry,
      post_title: post?.title || entry.post_slug || entry.post_id,
      banner: post?.banner || null,
    };
  });

  return NextResponse.json({ history });
}
