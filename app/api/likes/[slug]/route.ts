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
    const userId = cookieStore.get('user_id')?.value || 'anonymous';

    // Get like count
    const { data: stats, error: statsError } = await supabase
      .from('article_stats')
      .select('likes')
      .eq('slug', slug)
      .single();

    if (statsError && statsError.code !== 'PGRST116') {
      throw statsError;
    }

    // Check if user has liked
    const { data: userLike, error: likeError } = await supabase
      .from('user_likes')
      .select('id')
      .eq('slug', slug)
      .eq('user_id', userId)
      .single();

    return NextResponse.json({
      likes: stats?.likes || 0,
      hasLiked: !!userLike,
    });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json({ likes: 0, hasLiked: false }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const cookieStore = await cookies();
    let userId = cookieStore.get('user_id')?.value;

    // Generate user ID if not exists
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('user_likes')
      .select('id')
      .eq('slug', slug)
      .eq('user_id', userId)
      .single();

    let newLikeCount = 0;
    let hasLiked = false;

    if (existingLike) {
      // Unlike
      await supabase
        .from('user_likes')
        .delete()
        .eq('slug', slug)
        .eq('user_id', userId);

      const { data } = await supabase.rpc('decrement_likes', {
        article_slug: slug,
      });
      newLikeCount = data || 0;
      hasLiked = false;
    } else {
      // Like
      await supabase
        .from('user_likes')
        .insert({ slug, user_id: userId });

      const { data } = await supabase.rpc('increment_likes', {
        article_slug: slug,
      });
      newLikeCount = data || 1;
      hasLiked = true;
    }

    const response = NextResponse.json({
      likes: newLikeCount,
      hasLiked,
    });

    // Set cookie
    response.cookies.set('user_id', userId, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}


