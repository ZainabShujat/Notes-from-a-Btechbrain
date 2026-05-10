import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// GET settings (themes, community_enabled)
export async function GET() {
  const { data, error } = await supabase
    .from('settings')
    .select('themes,community_enabled')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// UPDATE settings (themes, community_enabled)
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { themes, community_enabled } = body;
  const { error } = await supabase
    .from('settings')
    .upsert({ id: 1, themes, community_enabled });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
