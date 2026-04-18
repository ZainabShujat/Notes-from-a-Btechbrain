import { NextRequest, NextResponse } from 'next/server';
// Update this import to match the actual export from '@/lib/supabase'
// For example, if the default export is the client, use:
import { supabase } from '../../../lib/supabase';
// Or, if it's named differently, adjust accordingly:
// import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const { data, error } = await supabase
      .from('article_stats')
      .select('views')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return NextResponse.json({ views: data?.views || 0 });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Use RPC function to increment views
    const { data, error } = await supabase.rpc('increment_views', {
      article_slug: slug,
    });

    if (error) throw error;

    return NextResponse.json({ views: data || 1 });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}
